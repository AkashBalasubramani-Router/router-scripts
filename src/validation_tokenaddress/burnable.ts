import { ethers } from "ethers";
import * as dotenv from "dotenv";
import {
  ChainGrpcWasmApi,
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  Network,
  toUtf8,
  MsgExecuteContract,
  createTransaction,
  NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";
dotenv.config();

let wasmClient: ChainGrpcWasmApi;
let endpoint: NetworkEndpoints;
endpoint = getEndpointsForNetwork(Network.Testnet);
let chainId = getChainInfoForNetwork(Network.Testnet).chainId;
let addresscontract: string =
  "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99";

const rpcUrl = process.env.RPC_URL_T as string;

const provider = new ethers.JsonRpcProvider(rpcUrl);

async function _burnableToken(contractAddress: string, targetAddress: string) {
  try {
    const variableName = "_burnableToken";

    const contract = new ethers.Contract(
      contractAddress,
      ["function " + variableName + "(address) view returns (bool)"],
      provider
    );

    const isBurnable = await contract[variableName](targetAddress);
    console.log(`Is ${targetAddress} burnable?`, isBurnable);

    if (isBurnable) {
      const variableName = "_tokenWhitelist";

      const contract = new ethers.Contract(
        contractAddress,
        ["function " + variableName + "(address) view returns (bool)"],
        provider
      );

      const isWhitelisted = await contract[variableName](targetAddress);
      console.log(`Is ${targetAddress} Whitelisted?`, isWhitelisted);
    } else {
      console.log(`Cannot verify the contract`);
    }
  } catch (error) {
    console.error(`Error querying _burnableToken:`, error);
  }
}

const contractAddress = process.env.ASSET_BRIDGE as string;
const targetAddress = process.env.TOKEN_ADDRESS as string;

_burnableToken(contractAddress, targetAddress);
