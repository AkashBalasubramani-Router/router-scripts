import { ethers } from "ethers";
import {
  ChainGrpcWasmApi,
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  Network,
  toUtf8,
  MsgExecuteContract,
  createTransaction,
  NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";
import * as dotenv from "dotenv";

dotenv.config();

// First function from the 1st script
async function queryWhiteListedContracts() {
  let wasmClient: ChainGrpcWasmApi;
  let endpoint: NetworkEndpoints;
  endpoint = getEndpointsForNetwork(Network.Testnet);
  let addresscontract: string =
    "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99";
  let function1 = toUtf8(JSON.stringify({ fetch_tokens_config: {} }));

  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  // Check if the given chainId and address are present in the data
  const token_address = process.env.TOKEN_ADDRESS as string;
  const token_chainId = process.env.TOKEN_CHAINID as string;
  const token_decimals = process.env.TOKEN_DECIMALS as string;

  //   console.log(querying.data);

  const isPresent = querying.data.some((entry: any) => {
    // Check if the structure of entry matches what you expect
    if (
      Array.isArray(entry) &&
      entry.length >= 5 &&
      typeof entry[0] === "string" &&
      typeof entry[1] === "string" &&
      typeof entry[4] === "number"
    ) {
      const chainIdInData = entry[0];
      const addressInData = entry[1];
      const decimalsInData = entry[4];

      return (
        chainIdInData === token_chainId &&
        addressInData.toLowerCase() === token_address.toLowerCase() &&
        decimalsInData === Number(token_decimals)
      );
    }
    return false;
  });

  if (isPresent) {
    console.log(
      `ChainId: ${token_chainId}, Address: ${token_address} with Decimals: ${token_decimals} are present in the data.`
    );
  } else {
    console.log(
      `ChainId: ${token_chainId} and Address: ${token_address} with Decimals: ${token_decimals} are not present in the data.`
    );
  }
}

async function _burnableToken(contractAddress: string, targetAddress: string) {
  try {
    const rpcUrl = process.env.RPC_URL_T as string;
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const variableName = "_burnableToken";

    const contract = new ethers.Contract(
      contractAddress,
      ["function " + variableName + "(address) view returns (bool)"],
      provider
    );

    const isBurnable = await contract[variableName](targetAddress);
    console.log(`Is ${targetAddress} burnable?`, isBurnable);

    if (isBurnable) {
      const variableName = "_tokenWhitelist";

      const contract = new ethers.Contract(
        contractAddress,
        ["function " + variableName + "(address) view returns (bool)"],
        provider
      );

      const isWhitelisted = await contract[variableName](targetAddress);
      console.log(`Is ${targetAddress} Whitelisted?`, isWhitelisted);
    } else {
      console.log(`Contract is not whitelisted`);
    }
  } catch (error) {
    console.error(`Error querying _burnableToken:`, error);
  }
}

// Third function from the 3rd script
async function queryFeeManagerContracts() {
  let wasmClient: ChainGrpcWasmApi;
  let endpoint: NetworkEndpoints;
  endpoint = getEndpointsForNetwork(Network.Testnet);
  let addresscontract: string =
    "router1mwdk9neca5stxfk508enc3y7g85gh2k05txeppsscjwxtnau7qlss4pnmj";
  let fee_manager: string = process.env.FEE_MANAGER as string;
  let function1 = toUtf8(JSON.stringify({ fetch_fee_manager: {} }));

  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  let data: string = querying.data as unknown as string;
  //   console.log(data);

  if (data == fee_manager) {
    console.log(`Verified! The fee manager is the same`);
  } else {
    console.log(`The fee manager is not the same`);
  }
}

async function queryStateVariable(
  contractAddress: string,
  variableName: string,
  targetAddress: string
) {
  try {
    const rpcUrl = process.env.RPC_URL_T;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(
      contractAddress,
      ["function " + variableName + "() view returns (address)"],
      provider
    );

    const stateVariableValue = await contract[variableName]();
    const queriedAddress = stateVariableValue.toLowerCase();
    console.log(`${variableName}:`, queriedAddress);

    if (queriedAddress === targetAddress.toLowerCase()) {
      console.log(
        `Queried address matches the target address: ${targetAddress}`
      );
    } else {
      console.log(`Queried address does not match the target address.`);
    }
  } catch (error) {
    console.error(`Error querying ${variableName}:`, error);
  }
}

// Call the three functions
queryWhiteListedContracts();
_burnableToken(
  process.env.ASSET_BRIDGE as string,
  process.env.TOKEN_ADDRESS as string
);
queryFeeManagerContracts();
queryStateVariable(
  process.env.DEXSPAN_ADDRESS_T as string,
  "assetBridge",
  process.env.ASSET_BRIDGE as string
);
