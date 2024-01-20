import * as dotenv from "dotenv";
import {
    Network,
} from "@routerprotocol/router-chain-sdk-ts";
import { multiChainUrlSuffix } from "../constants";
import { fetchActiveAssetForwarderContract, fetchDisabledAssetForwarderContract, fetchGatewayContract } from "../lcd/queryMultiChainConfig";
import { isContractPaused, pauseContract } from "../evm/queryEvmContract";
import { fetchAfDefaultWhitelistedContract } from "../cosmwasm/queries";
dotenv.config();

async function pauseDisbaledAssetForwarderContracts(network: Network) {
    console.log("Calling fetchDisabledAssetForwarderContract...");
    const afContracts: any[] = await fetchDisabledAssetForwarderContract(network);
    // console.log(gatewayContracts);

    for (let i = 0; i < afContracts.length; i++) {
        let contractAddress = afContracts[i].contractAddress;
        let chainId = afContracts[i].chainId;

        console.log(`--------${chainId}, ${contractAddress}----------`);
        let isPaused = await isContractPaused(contractAddress, chainId);
        if (!isPaused) {
            console.log(await pauseContract(contractAddress, chainId, true));
        }
    }
}

async function validateEnabledContractsStatus(network: Network) {
    console.log("Calling fetchActiveAssetForwarderContract...");
    const afContracts: any[] = await fetchActiveAssetForwarderContract(network);
    // console.log(gatewayContracts);
    const defaultWhiteListedAF: Record<string, any> = await fetchAfDefaultWhitelistedContract(network);
    let contractMap = new Map<string, string>();
    for (let i = 0; i < afContracts.length; i++) {
        let contractAddress = afContracts[i].contractAddress;
        let chainId = afContracts[i].chainId;

        let isPaused = await isContractPaused(contractAddress, chainId);
        if (isPaused) {
            console.log(`Alert-> Contract ${contractAddress} on chainId ${chainId} should unpaused`);
        }
        contractMap.set(chainId, contractAddress);
    }

    console.log(defaultWhiteListedAF.length, afContracts.length);
    if (defaultWhiteListedAF.length !== afContracts.length) {
        console.log("Alert-> Enabled Asset Forwarder count on LCD and on middleware should be same");
        console.log(`Currently on LCD it is ${afContracts.length} and on middleware it is  ${defaultWhiteListedAF.length}`);
    }
    for (let i = 0; i < defaultWhiteListedAF.length; i++) {
        let [chainId, contractAddress] = defaultWhiteListedAF[i];

        let lcdEnabledAddress = contractMap.get(chainId);
        if (contractAddress != lcdEnabledAddress) {
            console.log(`\nconfig MisMatch for ${chainId}, on LCD ${lcdEnabledAddress}, on middleware ${contractAddress}\n`);
        }
    }
}

pauseDisbaledAssetForwarderContracts(Network.Mainnet)
// validateEnabledContractsStatus(Network.Mainnet);
