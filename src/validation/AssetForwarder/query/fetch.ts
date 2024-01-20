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

export const fetch_chain_type = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_chain_type: {
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

export const fetch_dest_token = async function (
  env: string,
  contract_address: string,
  src_chain_id: string,
  dest_chain_id: string,
  src_token: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_dest_token: {
        src_chain_id: src_chain_id,
        dest_chain_id: dest_chain_id,
        src_token: src_token,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_dest_tokens_config = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_dest_tokens_config: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

///
export const fetch_expiry_time_period = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_expiry_time_period: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_gas_factor = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_gas_factor: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

//

export const fetch_owner = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_owner: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_static_fee = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_static_fee: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export const fetch_token_info = async function (
  env: string,
  contract_address: string,
  chain_id: string,
  token: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_info: {
        chain_id: chain_id,
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

export const fetch_whitelisted = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_whitelisted: {
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

/////
export const fetch_validation_fee = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_validation_fee: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

///
export const get_contract_version = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_contract_version: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data.version);
};

///

export const is_paused = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      is_paused: {
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

///
export const paused_info = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      paused_info: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

///
export const fetch_tokens_config = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_tokens_config: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

///

export const fetch_token_liquidity = async function (
  env: string,
  contract_address: string,
  chain_id: string,
  token: string
) {
  let client = await DetectChainGrpcWasmApi(env);

  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_liquidity: {
        chain_id: chain_id,
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

//
export const fetch_partners_bps_config = async function (
  env: string,
  contract_address: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_partners_bps_config: {},
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

//
export const fetch_last_info_received_timestamp = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_last_info_received_timestamp: {
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

fetch_last_info_received_timestamp(
  env,
  "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99",
  "43113"
);
