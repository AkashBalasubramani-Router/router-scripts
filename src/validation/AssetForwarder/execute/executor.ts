import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../send_message";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

// const addresses = JSON.parse(fs.readFileSync("../../voyager.json", "utf-8"));

export const set_expiry_time_period = async function (
  env: string,
  contract_address: string,
  expiry_time_period: number
) {
  try {
    const data = {
      expiry_time_period: expiry_time_period,
    };

    await sendMessage({
      env,
      action: "set_expiry_time_period",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
};

export const set_chain_type = async function (
  env: string,
  contract_address: string,
  chain_id: string,
  chain_type: string
) {
  try {
    const data = {
      chain_id: chain_id,
      chain_type: chain_type,
    };
    await sendMessage({
      env,
      action: "set_chain_type",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
};

export const set_gas_factor = async function (
  env: string,
  contract_address: string,
  gas_factor: number
) {
  try {
    const data = {
      gas_factor: gas_factor,
    };

    await sendMessage({
      env,
      action: "set_gas_factor",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const set_owner = async function (
  env: string,
  owner: string,
  contract_address: string
) {
  try {
    const data = {
      owner: owner,
    };

    await sendMessage({
      env,
      action: "set_owner",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const set_static_fee = async function (
  env: string,
  contract_address: string,
  fee: number
) {
  try {
    const data = {
      fee: fee,
    };

    await sendMessage({
      env,
      action: "set_static_fee",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const token_info = JSON.parse(fs.readFileSync("token-info.json", "utf-8"));
export const set_token_info = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      token: string;
      decimals: number;
      symbol: string;
    };

    type Data = {
      token_decimal_info: InsideData[];
    };

    const data: Data = {
      token_decimal_info: [],
    };

    console.log(token_info[env]);

    for (let i = 0; i < token_info[env].length; i++) {
      const individualData: InsideData = {
        chain_id: token_info[env][i].chain_id,
        token: token_info[env][i].token,
        decimals: token_info[env][i].decimals,
        symbol: token_info[env][i].symbol,
      };
      data["token_decimal_info"].push(individualData);
    }

    await sendMessage({
      env,
      action: "set_token_info",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const token_mapping = JSON.parse(
  fs.readFileSync("token-mapping.json", "utf-8")
);

export const set_token_mapping = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      src_chain_id: string;
      src_token: string;
      src_token_decimals: number;
      symbol: string;
    };

    type Data = {
      token_info: InsideData[];
    };

    const data: Data = {
      token_info: [],
    };

    console.log(token_mapping[env]);

    for (let i = 0; i < token_mapping[env].length; i++) {
      const individualData: InsideData = {
        src_chain_id: token_mapping[env][i].src_chain_id,
        src_token: token_mapping[env][i].src_token,
        src_token_decimals: token_mapping[env][i].src_token_decimals,
        symbol: token_mapping[env][i].symbol,
      };
      data["token_info"].push(individualData);
    }

    await sendMessage({
      env,
      action: "set_token_mapping",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const Pause = JSON.parse(fs.readFileSync("pause.json", "utf-8"));
export const pause = async function (env: string, contract_address: string) {
  try {
    type InsideData = {
      chains: string[];
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    console.log(Pause[env]);

    for (let i = 0; i < Pause[env].length; i++) {
      const individualData: InsideData = {
        chains: Pause[env][i].chains,
        // src_token: Pause[env][i].src_token,
        // src_token_decimals: Pause[env][i].src_token_decimals,
        // symbol: Pause[env][i].symbol,
      };
      data["chains"].push(individualData);
    }

    await sendMessage({
      env,
      action: "pause",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const Forwarder_address = JSON.parse(
  fs.readFileSync("withdrawal_addresses.json", "utf-8")
);
export const update_forwarder_address = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      address: string;
    };

    type Data = {
      withdrawal_addresses: InsideData[];
    };

    const data: Data = {
      withdrawal_addresses: [],
    };

    console.log(Forwarder_address[env]);

    for (let i = 0; i < Forwarder_address[env].length; i++) {
      const individualData: InsideData = {
        chain_id: Forwarder_address[env][i].chain_id,
        address: Forwarder_address[env][i].address,
      };
      data["withdrawal_addresses"].push(individualData);
    }

    await sendMessage({
      env,
      action: "update_forwarder_address",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

//
const white_list_address = JSON.parse(
  fs.readFileSync("whitelist.json", "utf-8")
);
export const whitelist_contracts = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      contract: string;
      is_default: boolean;
    };

    type Data = {
      contracts: InsideData[];
    };

    const data: Data = {
      contracts: [],
    };

    console.log(white_list_address[env]);

    for (let i = 0; i < white_list_address[env].length; i++) {
      const individualData: InsideData = {
        chain_id: white_list_address[env][i].chain_id,
        contract: white_list_address[env][i].contract,
        is_default: white_list_address[env][i].is_default,
      };
      data["contracts"].push(individualData);
    }

    await sendMessage({
      env,
      action: "whitelist_contracts",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const set_validation_fee = async function (
  env: string,
  contract_address: string,
  router_validation_fee: string
) {
  try {
    const data = {
      router_validation_fee: router_validation_fee,
    };

    await sendMessage({
      env,
      action: "set_validation_fee",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const partner_fees = JSON.parse(
  fs.readFileSync("withdrawal_addresses.json", "utf-8")
);
export const set_partner_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_infos: string[];
    };

    type Data = {
      fee_infos: InsideData[];
    };

    const data: Data = {
      fee_infos: [],
    };

    for (let i = 0; i < partner_fees[env].length; i++) {
      const individualData: InsideData = {
        fee_infos: partner_fees[env][i].fee_infos,
      };
      data["fee_infos"].push(individualData);
    }

    await sendMessage({
      env,
      action: "set_partner_fees",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const chain_type = JSON.parse(
  fs.readFileSync("withdrawal_addresses.json", "utf-8")
);
export const set_chain_types = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      chain_type: string;
    };

    type Data = {
      chain_type_info: InsideData[];
    };

    const data: Data = {
      chain_type_info: [],
    };

    for (let i = 0; i < chain_type[env].length; i++) {
      const individualData: InsideData = {
        chain_id: chain_type[env][i].chain_id,
        chain_type: chain_type[env][i].chain_type,
      };
      data["chain_type_info"].push(individualData);
    }

    await sendMessage({
      env,
      action: "set_chain_types",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const chain_bytes = JSON.parse(fs.readFileSync("chain-bytes.json", "utf-8"));
export const set_chain_bytes = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      bytes: number[];
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    for (let i = 0; i < chain_bytes[env].length; i++) {
      const individualData: InsideData = {
        chain_id: chain_bytes[env][i].chain_id,
        bytes: chain_bytes[env][i].bytes,
      };
      data["chains"].push(individualData);
    }

    await sendMessage({
      env,
      action: "set_chain_bytes_infos",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
}; //not working

const unPause = JSON.parse(fs.readFileSync("unpause.json", "utf-8"));
export const unpause = async function (env: string, contract_address: string) {
  try {
    type InsideData = {
      chains: string[];
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    for (let i = 0; i < unPause[env].length; i++) {
      const individualData: InsideData = {
        chains: unPause[env][i].chains,
      };
      data["chains"].push(individualData);
    }

    await sendMessage({
      env,
      action: "unpause",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

// Pause {
//   chains: Vec<String>,
// }
// set_token_info(
//   env,
//   "router1ux7cdgg5y22rtnx2mqyjrh879murvtahenlpj7vh85q85pv3aelsxpcumu"
// );

// set_token_mapping(
//   env,
//   "router1ux7cdgg5y22rtnx2mqyjrh879murvtahenlpj7vh85q85pv3aelsxpcumu"
// );

// update_forwarder_address(
//   env,
//   "router1ux7cdgg5y22rtnx2mqyjrh879murvtahenlpj7vh85q85pv3aelsxpcumu"
// );

whitelist_contracts(
  env,
  "router1ux7cdgg5y22rtnx2mqyjrh879murvtahenlpj7vh85q85pv3aelsxpcumu"
);
