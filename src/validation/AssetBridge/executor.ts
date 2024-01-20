import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../send_message";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

const addresses = JSON.parse(fs.readFileSync("../voyager.json", "utf-8"));
const burnableData = JSON.parse(fs.readFileSync("burnable_info.json", "utf-8"));
export const set_token_burnable_info = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      decimal: number;
      token_address: string;
    };

    type Data = {
      token_burnable_info: InsideData[];
    };

    const data: Data = {
      token_burnable_info: [],
    };

    for (let i = 0; i < burnableData[env].length; i++) {
      if (burnableData[env][i].burnable) {
        continue;
      }
      burnableData[env][i].chain_id =
        burnableData[env][i].chain_id.toLowerCase();
      burnableData[env][i].burnable = burnableData[env][i].burnable;
      burnableData[env][i].token_addr =
        burnableData[env][i].token_addr.toLowerCase();
      data["token_burnable_info"].push(burnableData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_token_burnable_info",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const decimalsData = JSON.parse(
  fs.readFileSync("token-decimals.json", "utf-8")
);
export const set_token_decimals = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      decimal: number;
      token_address: string;
    };

    type Data = {
      token_decimals: InsideData[];
    };

    const data: Data = {
      token_decimals: [],
    };

    for (let i = 0; i < decimalsData[env].length; i++) {
      decimalsData[env][i].chain_id =
        decimalsData[env][i].chain_id.toLowerCase();
      decimalsData[env][i].decimal = parseInt(decimalsData[env][i].decimal);
      decimalsData[env][i].token_address =
        decimalsData[env][i].token_address.toLowerCase();
      data["token_decimals"].push(decimalsData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_token_decimals",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const set_owner = async function (
  env: string,
  contract_address: string,
  owner: string
) {
  try {
    const data = {
      new_owner: owner,
    };

    console.log(data);

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

export const set_fee_manager = async function (
  env: string,
  contract_address: string,
  fee_contract: string
) {
  try {
    const data = {
      fee_contract: fee_contract,
    };

    console.log(data);

    await sendMessage({
      env,
      action: "set_fee_manager",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const whitelistData = JSON.parse(fs.readFileSync("whitelist.json", "utf-8"));
export const white_list_addresses = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      contract_type: number;
      contract_address: string;
    };

    type Data = {
      addresses_info: InsideData[];
    };

    const data: Data = {
      addresses_info: [],
    };

    for (let i = 0; i < whitelistData[env].length; i++) {
      if (whitelistData[env][i].alreadySet) {
        continue;
      }

      data["addresses_info"].push(whitelistData[env][i]);
    }

    console.log(data);
    await sendMessage({
      env,
      action: "white_list_addresses",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
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

    console.log(data);

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

export const set_router_reserve = async function (
  env: string,
  contract_address: string,
  router_reserve_addres: string
) {
  try {
    const data = {
      address: router_reserve_addres,
    };

    console.log(data);

    await sendMessage({
      env,
      action: "set_router_reserve",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const set_router_chain_id = async function (
  env: string,
  contract_address: string,
  chain_id: string
) {
  try {
    const data = {
      chain_id: chain_id,
    };

    console.log(data);

    await sendMessage({
      env,
      action: "set_router_chain_id",
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
  fee_in_bps: string
) {
  try {
    const data = {
      fee_in_bps: fee_in_bps,
    };

    console.log(data);

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

export const set_st_gas_limit = async function (
  env: string,
  contract_address: string,
  gas_limit: number
) {
  try {
    const data = {
      gas_limit: gas_limit,
    };

    console.log(data);

    await sendMessage({
      env,
      action: "set_st_gas_limit",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

export const mint_gas_tokens = async function (
  env: string,
  contract_address: string,
  chain_id: string,
  token: string,
  recipient: string
) {
  try {
    const data = {
      chain_id: chain_id,
      token: token,
      recipient: recipient,
    };

    console.log(data);

    await sendMessage({
      env,
      action: "mint_gas_tokens",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const rAssetInfo = JSON.parse(fs.readFileSync("rAssets.json", "utf-8"));
export const set_r_assets = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      name: string;
      chain_id: string;
      chain_type: number;
      asset: string;
      r_asset: string;
      alreadySet: boolean;
    };

    type Data = {
      assets: InsideData[];
    };

    const data: Data = {
      assets: [],
    };

    for (let i = 0; i < rAssetInfo[env].length; i++) {
      if (rAssetInfo[env][i].alreadySet) {
        continue;
      }

      rAssetInfo[env][i].asset = rAssetInfo[env][i].asset.toLowerCase();
      rAssetInfo[env][i].r_asset = rAssetInfo[env][i].r_asset.toLowerCase();

      data["assets"].push(rAssetInfo[env][i]);
    }

    console.log(data);
    await sendMessage({
      env,
      action: "set_r_assets",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const pauseData = JSON.parse(fs.readFileSync("pause.json", "utf-8"));
export const pause = async function (env: string, contract_address: string) {
  try {
    type InsideData = {
      chain_id: string;
      chain_type: number;
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    for (let i = 0; i < pauseData[env].length; i++) {
      if (pauseData[env][i].alreadySet) {
        continue;
      }

      data["chains"].push(pauseData[env][i]);
    }

    console.log(data);

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

const unpauseData = JSON.parse(fs.readFileSync("pause.json", "utf-8"));
export const unpause = async function (env: string, contract_address: string) {
  try {
    type InsideData = {
      chain_id: string;
      chain_type: number;
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    for (let i = 0; i < unpauseData[env].length; i++) {
      if (unpauseData[env][i].alreadySet) {
        continue;
      }

      data["chains"].push(unpauseData[env][i]);
    }

    console.log(data);

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

const chainBytesData = JSON.parse(
  fs.readFileSync("chain-bytes-info.json", "utf-8")
);
export const set_chain_bytes_infos = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      chain_type: number;
      bytes: number[];
      alreadySet: boolean;
    };

    type Data = {
      chains: InsideData[];
    };

    const data: Data = {
      chains: [],
    };

    for (let i = 0; i < chainBytesData[env].length; i++) {
      if (chainBytesData[env][i].alreadySet) {
        continue;
      }

      data["chains"].push(chainBytesData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_chain_bytes_infos",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting gas factor:", error);
  }
};

const chaintype = JSON.parse(fs.readFileSync("chaintype.json", "utf-8"));
export const set_chain_type = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      chain_id: string;
      chain_type: number;
    };

    type Data = {
      chain_type_info: InsideData[];
    };

    const data: Data = {
      chain_type_info: [],
    };

    for (let i = 0; i < chaintype[env].length; i++) {
      if (chaintype[env][i].alreadySet) {
        continue;
      }

      data["chain_type_info"].push(chaintype[env][i]);

      await sendMessage({
        env,
        action: "set_chain_types",
        contractAddr: contract_address,
        data,
      });
    }
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
};

//////////////
set_chain_type(
  env,
  "router1yclf6qdph5v78zyf6vp36gwstdz3lutw6pn3yyfjz5ujejczj74qnjj7gg"
);
