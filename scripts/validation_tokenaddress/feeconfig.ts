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
import { ethers } from "ethers";

dotenv.config();

interface EntryData {
  chainId: string;
  address: string;
}

let wasmClient: ChainGrpcWasmApi;
let endpoint: NetworkEndpoints;
endpoint = getEndpointsForNetwork(Network.Testnet);
let chainId = getChainInfoForNetwork(Network.Testnet).chainId;
let addresscontract: string =
  "router1mwdk9neca5stxfk508enc3y7g85gh2k05txeppsscjwxtnau7qlss4pnmj";
let fee_manager: string = process.env.FEE_MANAGER as string;
let function1 = toUtf8(JSON.stringify({ fetch_fee_manager: {} }));

async function queryFeeManagerContracts() {
  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  let data: string = querying.data as unknown as string;
  console.log(data);

  if (data == fee_manager) {
    console.log(`Verified ! The fee manager is same`);
  } else {
    console.log(`The fee manager is not same`);
  }
}
queryFeeManagerContracts();
