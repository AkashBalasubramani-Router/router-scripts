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

let wasmClient: ChainGrpcWasmApi;
let endpoint: NetworkEndpoints;
endpoint = getEndpointsForNetwork(Network.Testnet);
let chainId = getChainInfoForNetwork(Network.Testnet).chainId;
let addresscontract: string =
  "router1mwdk9neca5stxfk508enc3y7g85gh2k05txeppsscjwxtnau7qlss4pnmj";
let function1 = toUtf8(JSON.stringify({ fetch_all_white_listed: {} }));

async function queryWhiteListedContracts() {
  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  const targetContractAddress = process.env.ASSET_BRIDGE as string;
  const targetChainId = process.env.CHAINID as string;

  for (const [
    index,
    [chainIdData, contractAddress],
  ] of querying.data.entries()) {
    const [dataChainId, dataIndex] = chainIdData;
    const dataChainIdStr = String(dataChainId);

    if (
      dataChainIdStr === targetChainId &&
      contractAddress.toLowerCase() === targetContractAddress.toLowerCase()
    ) {
      console.log(
        `Found a match for Chain ID ${targetChainId} and Contract Address ${targetContractAddress} at index ${index}`
      );
      return true;
    }
  }

  console.log(
    `No match found for Chain ID ${targetChainId} and Contract Address ${targetContractAddress}`
  );

  return false;
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

queryStateVariable(
  process.env.DEXSPAN_ADDRESS_T as string,
  "assetBridge",
  process.env.ASSET_BRIDGE as string
);

queryWhiteListedContracts();
