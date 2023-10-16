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

export async function is_paused(env: string, chain_id: string) {
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
      is_paused: {
        chain_id: "43113",
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

is_paused(env, "43113");
