import fs from "fs";
import dotenv from "dotenv";
import sendMessage from "../../send_message";
dotenv.config();

if (!process.env.ENV) {
  throw new Error("set ENV in env file");
}
const env = process.env.ENV;

const decimalsData = JSON.parse(
  fs.readFileSync("../token-symbols.json", "utf-8")
);

const addresses = JSON.parse(fs.readFileSync("../voyager.json", "utf-8"));
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
  decimalsData[env][i].chain_id = decimalsData[env][i].chain_id.toLowerCase();
  decimalsData[env][i].symbol = decimalsData[env][i].symbol.toLowerCase();
  data["token_symbols"].push(decimalsData[env][i]);
}

console.log(data);

async function main() {
  await sendMessage({
    env,
    action: "set_token_symbols",
    contractAddr: addresses[env].FeeManager.addr,
    data,
  });
}

main();
