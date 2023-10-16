import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../send_message";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}

const env = process.env.ENV;

const addresses = JSON.parse(fs.readFileSync("../voyager.json", "utf-8"));
const data = {
  addr: addresses[env]["myaddress"].addr,
};

async function main() {
  await sendMessage({
    env,
    action: "set_asset_bridge_addr",
    contractAddr: addresses[env].FeeManager.addr,
    data,
  });
}

main();
