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

///////////////////////

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

export async function get_fee_config_i_d(
  env: string,
  contract_address: string,
  src_chain_id: string,
  src_chain_type: number,
  dest_chain_id: string,
  dest_chain_type: number,
  src_token: string,
  dest_token: string
) {
  let client = await DetectChainGrpcWasmApi(env);

  const request = {
    address: contract_address,
    queryData: toUtf8(
      JSON.stringify({
        get_fee_config_i_d: {
          src_chain_id,
          src_chain_type,
          dest_chain_id,
          dest_chain_type,
          src_token,
          dest_token,
        },
      })
    ),
  };

  const feeConfigId = await client.fetchSmartContractState(
    request.address,
    request.queryData
  );

  return feeConfigId.data;
}

export const fetch_available_fee = async function (
  env: string,
  contract_address: string,
  src_chain_id: string,
  src_token: string,
  dest_token: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_available_fee: {
        src_chain_id: src_chain_id,
        src_token: src_token,
        dest_token: dest_token,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export async function get_fee_struct(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_fee_struct: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_lp_fee_in_bps(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_lp_fee_in_bps: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_validator_fee_in_bps(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_validator_fee_in_bps: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_protocol_fee_in_bps(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_protocol_fee_in_bps: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_widget_fee_in_bps(
  env: string,
  contract_address: string,
  widget_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_widget_fee_in_bps: {
        widget_id: widget_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_base_fee_in_bps(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_base_fee_in_bps: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_swap_fee_in_bps(
  env: string,
  contract_address: string,
  fee_config_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_swap_fee_in_bps: {
        fee_config_id: fee_config_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export const get_fee = async function (
  env: string,
  contract_address: string,
  src_chain_id: string,
  dest_chain_id: string,
  src_token: string,
  widget_id: string,
  transaction_volume: string,
  gas_limit: number,
  gas_price: number
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_fee: {
        src_chain_id: src_chain_id,
        dest_chain_id: dest_chain_id,
        src_token: src_token,
        widget_id: widget_id,
        transaction_volume: transaction_volume,
        gas_limit: gas_limit,
        gas_price: gas_price,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
};

export async function get_fee_factor(
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_fee_factor: {
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_default_gas_limit(
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_default_gas_limit: {
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function get_default_gas_price(
  env: string,
  contract_address: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_default_gas_price: {
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

/////
export async function fetch_token_symbol(
  env: string,
  contract_address: string,
  token: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_symbol: {
        token: token,
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}
/////
export async function fetch_symbol_price(
  env: string,
  contract_address: string,
  symbol: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_symbol_price: {
        symbol: symbol,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}
////////
export async function fetch_token_price(
  env: string,
  contract_address: string,
  token: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_price: {
        token: token,
        chain_id: chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
}

export async function fetch_token_decimal(
  env: string,
  contract_address: string,
  token: string,
  chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_decimal: {
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
}

export async function fetch_token_on_different_chain(
  env: string,
  contract_address: string,
  token: string,
  src_chain_id: string,
  dest_chain_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_token_on_different_chain: {
        token: token,
        src_chain_id: src_chain_id,
        dest_chain_id: dest_chain_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
} //string not found

export async function get_generic_fee(
  env: string,
  contract_address: string,
  chain_id: string,
  chain_type: string,
  gas_limit: number,
  gas_price: number,
  src_token_decimal: number
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      get_generic_fee: {
        chain_id: chain_id,
        chain_type: chain_type,
        gas_limit: gas_limit,
        gas_price: gas_price,
        src_token_decimal: src_token_decimal,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
} //@unknown variant

export async function fetch_fee_var(
  env: string,
  contract_address: string,
  dest_chain_id: string,
  dest_chain_type: string,
  dest_token: string,
  src_chain_id: string,
  src_chain_type: string,
  src_stable_token: string,
  src_token: string,
  token_decimal: string,
  widget_id: string
) {
  let client = await DetectChainGrpcWasmApi(env);
  let function1 = toUtf8(
    JSON.stringify({
      fetch_fee_var: {
        dest_chain_id: dest_chain_id,
        dest_chain_type: dest_chain_type,
        dest_token: dest_token,
        src_chain_id: src_chain_id,
        src_chain_type: src_chain_type,
        src_stable_token: src_stable_token,
        src_token: src_token,
        token_decimal: token_decimal,
        widget_id: widget_id,
      },
    })
  );

  const querying = await client.fetchSmartContractState(
    contract_address,
    function1
  );

  console.log(querying.data);
} //unknown variant @error
/////////////////////

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}
const env = process.env.ENV;

fetch_token_on_different_chain(
  env,
  "router194aq8vvnpvfn6v343hgndq53tpu728arw3ar0n5s3x9497d5g3asm9awzk",
  "0x001",
  "43113",
  "80001"
);

//get_bps_fee @left
