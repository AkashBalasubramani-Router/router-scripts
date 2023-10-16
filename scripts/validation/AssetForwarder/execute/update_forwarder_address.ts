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
  chain_id: string;
  address: string;
};
type Data = {
  withdrawal_addresses: InsideData[];
};

const data: Data = {
  withdrawal_addresses: [
    {
      chain_id: "43113",
      address: "0x5F04693482cfC121FF244cB3c3733aF712F9df02",
    },
  ],
};

async function main() {
  await sendMessage({
    env,
    action: "update_forwarder_address",
    contractAddr: addresses[env].AssetForwarder1.addr,
    data,
  });
}

main();
