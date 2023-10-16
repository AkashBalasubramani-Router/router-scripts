import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../../send_message";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

const addresses = JSON.parse(fs.readFileSync("../../voyager.json", "utf-8"));

type InsideData = {
  chain_id: String;
  contract: String;
  is_default: boolean;
};

type Data = {
  contracts: InsideData[];
};

const data: Data = {
  contracts: [
    {
      chain_id: "43113",
      contract: "0xA4ff1239e6c67386A63DCe3abDBA4D348A87b025",
      is_default: true,
    },
  ],
};

async function main() {
  await sendMessage({
    env,
    action: "whitelist_contracts",
    contractAddr: addresses[env].AssetForwarder1.addr,
    data,
  });
}

main();
