import {
  toUtf8,
  ChainGrpcWasmApi,
  getEndpointsForNetwork,
  Network,
} from "@routerprotocol/router-chain-sdk-ts";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
let wasmClient: ChainGrpcWasmApi;

const addresses = JSON.parse(fs.readFileSync("../../voyager.json", "utf-8"));

export async function fetch_blocked_fund(env: string) {
  if (env == "devnet") {
    wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Devnet).grpcEndpoint
    );
  } else if (env == "alpha") {
    wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.AlphaDevnet).grpcEndpoint
    );
  } else if (env == "testnet") {
    wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Testnet).grpcEndpoint
    );
  } else if (env == "mainnet") {
    wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Mainnet).grpcEndpoint
    );
  } else {
    console.log("error ", env);

    throw new Error(
      "your env does not match either devnet, alpha, testnet or mainnet"
    );
  }

  let addresscontract: string = addresses[env].AssetForwarder.addr;

  let function1 = toUtf8(
    JSON.stringify({
      fetch_blocked_fund: {
        chain_id: "43113",
        depositor: "0x69696280f79f118451f04bfd432bfa588fc25462",
        token: "0x3c6bb231079c1023544265f8f26505bc5955c3df",
      },
    })
  );

  const querying = await wasmClient.fetchSmartContractState(
    addresscontract,
    function1
  );

  console.log(querying.data);
}

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

fetch_blocked_fund(env);
