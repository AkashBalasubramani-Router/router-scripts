import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../send_message";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

// const addresses = JSON.parse(fs.readFileSync("../../voyager.json", "utf-8"));

export const set_asset_bridge_addr = async function (
  env: string,
  contract_address: string,
  asset_bride_address: string
) {
  try {
    const data = {
      addr: asset_bride_address,
    };

    await sendMessage({
      env,
      action: "set_asset_bridge_addr",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
};

const decimalsData = JSON.parse(fs.readFileSync("token-symbols.json", "utf-8"));

export const set_token_symbols = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      token: string;
      chain_id: number;
      symbol: string;
    };

    type Data = {
      token_symbols: InsideData[];
    };

    const data: Data = {
      token_symbols: [],
    };

    for (let i = 0; i < decimalsData[env].length; i++) {
      decimalsData[env][i].token = decimalsData[env][i].token;
      decimalsData[env][i].chain_id =
        decimalsData[env][i].chain_id.toLowerCase();
      decimalsData[env][i].symbol = decimalsData[env][i].symbol.toLowerCase();
      data["token_symbols"].push(decimalsData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_token_symbols",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Works

const symbolPriceData = JSON.parse(
  fs.readFileSync("symbol-price.json", "utf-8")
);
export const set_symbol_prices = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      symbol: string;
      price_in_usdx10e9: string;
      alreadySet: boolean;
    };

    type Data = {
      symbol_prices: InsideData[];
    };

    const data: Data = {
      symbol_prices: [],
    };

    for (let i = 0; i < symbolPriceData[env].length; i++) {
      if (symbolPriceData[env][i].alreadySet) {
        continue;
      }

      data["symbol_prices"].push(symbolPriceData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_symbol_prices",
      data,
      contractAddr: contract_address,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //works

const feeFactorData = JSON.parse(fs.readFileSync("fee-factor.json", "utf-8"));

export const set_fee_factor = async function (
  env: string,
  contract_address: string
) {
  try {
    for (let i = 0; i < feeFactorData[env].length; i++) {
      await sendMessage({
        env,
        contractAddr: contract_address,
        action: "set_fee_factor",
        data: feeFactorData[env][i],
      });
    }
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //works

const feesData = JSON.parse(fs.readFileSync("FeeInfo.json", "utf-8"));
export const set_fees = async function (env: string, contract_address: string) {
  try {
    type InsideData = {
      fee_config_id: string;
      fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < Fees_data[env].length; i++) {
      Fees_data[env][i].fee_config_id = Fees_data[env][i].fee_config_id;
      Fees_data[env][i].fee_in_bps_x1000 = Fees_data[env][i].fee_in_bps_x1000;

      data["fees"].push(Fees_data[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      contractAddr: contract_address,
      action: "set_fees",
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Works

const fees = JSON.parse(fs.readFileSync("FeeInfo.json", "utf-8"));
export const set_base_fee = async function (
  env: string,
  contract_address: string
) {
  // const addresses = JSON.parse(fs.readFileSync("config/voyager.json", "utf-8"));
  type InsideData = {
    fee_config_id: string;
    fee_in_bps_x1000: string;
  };

  type Data = {
    fees: InsideData[];
  };

  const data: Data = {
    fees: [],
  };

  for (let i = 0; i < feesData[env].length; i++) {
    feesData[env][i].fee_config_id = feesData[env][i].fee_config_id;
    feesData[env][i].fee_in_bps_x1000 = feesData[env][i].fee_in_bps_x1000;

    data["fees"].push(feesData[env][i]);
  }

  console.log(data);

  await sendMessage({
    env,
    contractAddr: contract_address,
    action: "set_base_fees",
    data,
  });
}; //should work but it isnt.

//first set fee

export const set_owner = async function (
  env: string,
  contract_address: string,
  new_owner: string
) {
  try {
    const data = {
      new_owner: new_owner,
    };

    await sendMessage({
      env,
      action: "set_owner",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
};

export const set_lp_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_config_id: string;
      fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < feesData[env].length; i++) {
      feesData[env][i].fee_config_id = feesData[env][i].fee_config_id;
      feesData[env][i].fee_in_bps_x1000 = feesData[env][i].fee_in_bps_x1000;

      data["fees"].push(feesData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      contractAddr: contract_address,
      action: "set_lp_fees",
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Should work but isnt

const Fees_Data = JSON.parse(fs.readFileSync("fees.json", "utf-8"));
export const set_validator_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_config_id: string;
      fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < feesData[env].length; i++) {
      feesData[env][i].fee_config_id = feesData[env][i].fee_config_id;
      feesData[env][i].fee_in_bps_x1000 = feesData[env][i].fee_in_bps_x1000;

      data["fees"].push(feesData[env][i]);
    }

    await sendMessage({
      env,
      action: "set_validator_fees",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Should work but isnt

const fees_Data = JSON.parse(fs.readFileSync("fees.json", "utf-8"));
export const set_protocol_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_config_id: string;
      fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < feesData[env].length; i++) {
      feesData[env][i].fee_config_id = feesData[env][i].fee_config_id;
      feesData[env][i].fee_in_bps_x1000 = feesData[env][i].fee_in_bps_x1000;

      data["fees"].push(feesData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      contractAddr: contract_address,
      data,
      action: "set_protocol_fees",
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //@error

const widgetFees = JSON.parse(fs.readFileSync("widget-fees.json", "utf-8"));
export const set_widget_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      widget_id: string;
      widget_fee_in_bps_x1000: string;
      alreadySet: boolean;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < widgetFees[env].length; i++) {
      if (widgetFees[env][i].alreadySet) {
        continue;
      }

      data["fees"].push(widgetFees[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_widget_fees",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //working

const fees_data = JSON.parse(fs.readFileSync("fees.json", "utf-8"));
export const set_swap_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_config_id: string;
      fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < feesData[env].length; i++) {
      feesData[env][i].fee_config_id = feesData[env][i].fee_config_id;
      feesData[env][i].fee_in_bps_x1000 = feesData[env][i].fee_in_bps_x1000;

      data["fees"].push(feesData[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      data,
      contractAddr: contract_address,
      action: "set_swap_fees",
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //SHould work but isnt

const defaultGasLimitData = JSON.parse(
  fs.readFileSync("default-gas-limit.json", "utf-8")
);
export const set_default_gas_limit = async function (
  env: string,
  contract_address: string
) {
  try {
    for (let i = 0; i < defaultGasLimitData[env].length; i++) {
      await sendMessage({
        env,
        contractAddr: contract_address,
        action: "set_default_gas_limit",
        data: defaultGasLimitData[env][i],
      });
    }
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //works

const defaultGasPriceData = JSON.parse(
  fs.readFileSync("default-gas-price.json", "utf-8")
);
export const set_default_gas_price = async function (
  env: string,
  contract_address: string
) {
  try {
    for (let i = 0; i < defaultGasPriceData[env].length; i++) {
      await sendMessage({
        env,
        action: "set_default_gas_price",
        contractAddr: contract_address,
        data: defaultGasPriceData[env][i],
      });
    }
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Should work but isnt

const Fees_data = JSON.parse(fs.readFileSync("LPfee.json", "utf-8"));
export const set_lp_validator_protocol_fees = async function (
  env: string,
  contract_address: string
) {
  try {
    type InsideData = {
      fee_config_id: string;
      lp_fee_in_bps_x1000: string;
      validator_fee_in_bps_x1000: string;
      protocol_fee_in_bps_x1000: string;
    };

    type Data = {
      fees: InsideData[];
    };

    const data: Data = {
      fees: [],
    };

    for (let i = 0; i < Fees_data[env].length; i++) {
      if (Fees_data[env][i].alreadySet) {
        continue;
      }

      (Fees_data[env][i].fee_config_id = Fees_data[env][i].fee_config_id),
        (Fees_data[env][i].lp_fee_in_bps_x1000 =
          Fees_data[env][i].lp_fee_in_bps_x1000),
        (Fees_data[env][i].validator_fee_in_bps_x1000 =
          Fees_data[env][i].validator_fee_in_bps_x1000),
        (Fees_data[env][i].protocol_fee_in_bps_x1000 =
          Fees_data[env][i].protocol_fee_in_bps_x1000),
        data["fees"].push(Fees_data[env][i]);
    }

    console.log(data);

    await sendMessage({
      env,
      action: "set_lp_validator_protocol_fees",
      contractAddr: contract_address,
      data,
    });
  } catch (error) {
    console.error("Error setting expiry time period:", error);
  }
}; //Supposed to work but not working

//////////////
set_lp_validator_protocol_fees(
  env,
  "router194aq8vvnpvfn6v343hgndq53tpu728arw3ar0n5s3x9497d5g3asm9awzk"
);
