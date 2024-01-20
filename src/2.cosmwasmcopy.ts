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

interface EntryData {
  chainId: string;
  address: string;
}

let wasmClient: ChainGrpcWasmApi;
let endpoint: NetworkEndpoints;
endpoint = getEndpointsForNetwork(Network.Testnet);
let chainId = getChainInfoForNetwork(Network.Testnet).chainId;
let addresscontract: string =
  "router1ux7cdgg5y22rtnx2mqyjrh879murvtahenlpj7vh85q85pv3aelsxpcumu";
let function1 = toUtf8(
  JSON.stringify({
    is_paused: {
      chain_id: "43113",
    },
  })
);

async function queryWhiteListedContracts() {
  wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  // Check if the given chainId and address are present in the data
  const targetContractAddress = process.env.COSM_WASM as string;
  const targetChainId = process.env.CHAINID as string;

  console.log(querying.data);

  // const isPresent = querying.data.some((entry: [string[], boolean]) => {
  //   const [chainIdInData, addressInData] = entry[0];
  //   return (
  //     chainIdInData === targetChainId && addressInData === targetContractAddress
  //   );
  // });

  // if (isPresent) {
  //   console.log(
  //     `ChainId: ${targetChainId} and Address: ${targetContractAddress} are present in the data.`
  //   );
  // } else {
  //   console.log(
  //     `ChainId: ${targetChainId} and Address: ${targetContractAddress} are not present in the data.`
  //   );
  // }
}

queryWhiteListedContracts();
