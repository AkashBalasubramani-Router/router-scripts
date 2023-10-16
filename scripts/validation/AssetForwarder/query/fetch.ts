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

export async function DetectChainGrpcWasmApi(
  env: string
): Promise<ChainGrpcWasmApi> {
  if (env == "devnet") {
    return (wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Devnet).grpcEndpoint
    ));
  } else if (env == "alpha") {
    return (wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.AlphaDevnet).grpcEndpoint
    ));
  } else if (env == "testnet") {
    return (wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Testnet).grpcEndpoint
    ));
  } else if (env == "mainnet") {
    return (wasmClient = new ChainGrpcWasmApi(
      getEndpointsForNetwork(Network.Mainnet).grpcEndpoint
    ));
  } else {
    console.log("error ", env);

    throw new Error(
      "your env does not match either devnet, alpha, testnet or mainnet"
    );
  }
}

export const fetch_all_chain_bytes_config = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_all_chain_bytes_config: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_all_default_white_listed = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_all_default_white_listed: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_all_white_listed = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_all_white_listed: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_balance = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);

  let function1 = toUtf8(
    JSON.stringify({
      fetch_balance: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_blocked_fund = async function (
  env: string,
  contract_address: string,
  chain_id: string,
  depositor: string,
  token: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_blocked_fund: {
        chain_id: chain_id,
        depositor: depositor,
        token: token,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_chain_bytes_info = async function (
  env: string,
  contract_address: string,
  bytes: number[]
) {
  let client = await DetectChainGrpcWasmApi(env);

  let function1 = toUtf8(
    JSON.stringify({
      fetch_chain_bytes_info: {
        bytes: bytes,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_chain_bytes = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);

  let function1 = toUtf8(
    JSON.stringify({
      fetch_chain_bytes: {
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

/////////////////////

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}
const env = process.env.ENV;

fetch_chain_bytes(
  env,
  "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99",
  "43113"
);
