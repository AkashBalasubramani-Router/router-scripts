import axios from "axios";
import * as dotenv from "dotenv";
import {
    getEndpointsForNetwork,
    Network,
} from "@routerprotocol/router-chain-sdk-ts";
import { multiChainUrlSuffix } from "../constants";
dotenv.config();

export async function fetchMultiChainConfig(
    network: Network
): Promise<any[]> {
    try {
        const endpoints = getEndpointsForNetwork(network);
        const response = await axios.get(endpoints.lcdEndpoint + multiChainUrlSuffix);
        const data = response.data;

        if (data && data.contractConfig) {
            return data.contractConfig;
        } else {
            console.log("Data or contractConfig not found in the response.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function fetchGatewayContract(network: Network): Promise<any[]> {

    const multiChainContracts = await fetchMultiChainConfig(network);
    const gatewayContracts = multiChainContracts.filter((contract: any) =>
        contract.contractType === "GATEWAY" &&
        contract.contract_enabled === true
    );
    return gatewayContracts;
}

export async function fetchActiveAssetForwarderContract(network: Network): Promise<any[]> {

    const multiChainContracts = await fetchMultiChainConfig(network);
    const gatewayContracts = multiChainContracts.filter((contract: any) => {
        return (
            contract.contractType === "VOYAGER" &&
            contract.contract_enabled === true
        );
    });
    return gatewayContracts;
}

export async function fetchDisabledAssetForwarderContract(network: Network): Promise<any[]> {

    const multiChainContracts = await fetchMultiChainConfig(network);
    const gatewayContracts = multiChainContracts.filter((contract: any) => {
        return (
            contract.contractType === "VOYAGER" &&
            contract.contract_enabled === false
        );
    });
    return gatewayContracts;
}

async function unitTesting() {
    // ALL Contracts
    // fetchMultiChainConfig(Network.Mainnet);

    // Gateway Contracts
    console.log("Calling fetchGatewayContract...");
    const gatewayContracts: any[] = await fetchGatewayContract(Network.Mainnet);
    console.log(gatewayContracts);

    // Active AF
    console.log("Calling fetchActiveAssetForwarderContract...");
    const activeAFContracts: any[] = await fetchActiveAssetForwarderContract(Network.Mainnet);
    console.log(activeAFContracts);

    // Old AF
    console.log("Calling fetchDisabledAssetForwarderContract...");
    const oldAFContracts: any[] = await fetchDisabledAssetForwarderContract(Network.Mainnet);
    console.log(oldAFContracts);

    console.log(gatewayContracts.length, activeAFContracts.length, oldAFContracts.length);
}

// unitTesting()