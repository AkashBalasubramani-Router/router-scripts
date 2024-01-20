import { ethers } from "ethers";
import {
  ChainGrpcWasmApi,
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  Network,
  toUtf8,
  NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";
import * as dotenv from "dotenv";
import { getRPC } from "../constants";
const fs = require('fs-extra')
dotenv.config();

let wasmClient: ChainGrpcWasmApi;
let endpoint: NetworkEndpoints;
endpoint = getEndpointsForNetwork(Network.Testnet);



export async function isContractPaused(
  contractAddress: string,
  chainId: string
): Promise<boolean> {
  try {
    let filepath = __dirname + "/../abi/AssetForwarder.abi";
    const afABI = JSON.parse(fs.readFileSync(filepath, "utf-8"));

    const [chainType, rpcURL] = getRPC(chainId);
    if (!rpcURL) {
      return false;
    }
    if (chainType == "EVM") {
      const provider = new ethers.JsonRpcProvider(rpcURL);
      const contract = new ethers.Contract(
        contractAddress,
        afABI,
        provider
      );

      const stateVariableValue = await contract.paused();
      return stateVariableValue;
    } else {
      return false
    }
  } catch (error) {
    console.log(`Error while calling isPaused Function ${error}, ${chainId} ${contractAddress}`);
    return false;
  }
}

export async function pauseContract(
  contractAddress: string,
  chainId: string,
  pause: boolean
): Promise<boolean> {
  try {
    let filepath = __dirname + "/../abi/AssetForwarder.abi";
    const afABI = JSON.parse(fs.readFileSync(filepath, "utf-8"));

    console.log(`inside pauseContract function ${chainId}, ${contractAddress}`);
    const [chainType, rpcURL] = getRPC(chainId);
    if (!rpcURL) {
      return false;
    }
    if (chainType == "EVM") {
      const provider = new ethers.JsonRpcProvider(rpcURL);
      const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      signer.provider
      const contract = new ethers.Contract(
        contractAddress,
        afABI,
        signer
      );
      let PAUSER_ROLE = "0x539440820030c4994db4e31b6b800deafd503688728f932addfe7a410515c14c";
      const hasRole = await contract.hasRole(PAUSER_ROLE, signer.address);
      if (!hasRole) {
        console.log(`${signer.address} should have ${PAUSER_ROLE}`);
        return false;
      }
      if (pause) {
        const response = await contract.pause();
        console.log("Invoked Pause Function", response);
        return response;
      } else {
        const response = await contract.unpause();
        console.log("Invoked UnPause Function", response);
      return response;
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(`Error while calling isPaused Function ${error}`);
    return false;
  }
}
