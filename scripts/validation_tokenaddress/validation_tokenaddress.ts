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

let addresscontract: string =
  "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99";
let function1 = toUtf8(JSON.stringify({ fetch_tokens_config: {} }));

async function queryWhiteListedContracts() {
  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  const token_address = process.env.TOKEN_ADDRESS as string;
  const token_chainId = process.env.TOKEN_CHAINID as string;
  const token_decimals = process.env.TOKEN_DECIMALS as string;

  console.log(querying.data);

  const isPresent = querying.data.some((entry: any) => {
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

queryWhiteListedContracts();
