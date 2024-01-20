import {
    toUtf8,
    ChainGrpcWasmApi,
    getEndpointsForNetwork,
    Network,
    NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";
import { getAssetForwarderAddress } from "../constants";

export async function fetch_token_liquidity(
    network: Network,
    afm: string,
    chainId: string,
    token: string,
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    let request = {
        address: afm,
        queryData: toUtf8(
            JSON.stringify({
                "fetch_token_liquidity": {
                    "chain_id": chainId,
                    "token": token
                }
            })
        ),
    };
    try {
        let tokenLiquidity = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        console.log(`Liquidity Of token -> ${token} on  chain ->${chainId} is => ${tokenLiquidity}`);
    } catch (err) {
        console.log(`Error in fetch_token_liquidity for token -> ${token} on  chain ->${chainId}`);
    }
}

export async function fetchClaimableAmount(
    network: Network,
    afm: string,
    symbol: string,
    forwarder: string,
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    let request = {
        address: afm,
        queryData: toUtf8(
            JSON.stringify({
                "fetch_claimable_amount": {
                    "symbol": symbol,
                    "forwarder": forwarder
                }
            })
        ),
    };
    try {
        let claimableAmount = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        console.log(`Claimable Amount of forwarder -> ${forwarder} for symbol ->${symbol} is => ${claimableAmount}`);
    } catch (err) {
        console.log(`Error while fetching Claimable Amount of forwarder -> ${forwarder} for symbol ->${symbol}`);
    }
}

export async function fetchBlockFunds(
    network: Network,
    afm: string,
    chainId: string,
    token: string,
    depositor: string,
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    
    let request = {
        address: afm,
        queryData: toUtf8(
            JSON.stringify({
                "fetch_blocked_fund": {
                    "chain_id": chainId,
                    "depositor": depositor,
                    "token": token
                }
            })
        ),
    };
    try {
        let blockedFunds = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        console.log(`Blocked Funds of depositor-> ${depositor} for token->${token} on chain_id->${chainId} is => ${blockedFunds}`);
    } catch (err) {
        console.log(`Error while fetching blockedFunds of depositor-> ${depositor} for token->${token} on chain_id->${chainId}`);
    }
}

export async function fetchDepositRequestInfo(
    network: Network,
    afm: string,
    chainId: string,
    depositNonce: number,
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    
    let request = {
        address: afm,
        queryData: toUtf8(
            JSON.stringify({
                "fetch_deposit_funds_info": {
                  "src_chain_id": chainId,
                  "deposit_nonce": depositNonce
                }
              })
        ),
    };
    try {
        let depositInfo = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        console.log(`Deposit Info for chainId-> ${chainId} & depositId-> ${depositNonce} is => ${depositInfo}`);
    } catch (err) {
        console.log(`Error while fetching Deposit Info for chainId-> ${chainId} & depositId-> ${depositNonce}`);
    }
}

export async function commonStaticQuerier(
    network: Network,
    afm: string,
    queryMsg: string
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    
    let request = {
        address: afm,
        queryData: toUtf8(queryMsg),
    };
    try {
        let queryResponse = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        return queryResponse;
    } catch (err) {
        return err;
    }
}

export async function fetchAfDefaultWhitelistedContract(network: Network): Promise<Record<string, any>> {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    
    let afm = getAssetForwarderAddress(network);
    let queryMessage = JSON.stringify({ "fetch_all_default_white_listed": {} });

    let request = {
        address: afm,
        queryData: toUtf8(queryMessage),
    };
    try {
        let queryResponse = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        return queryResponse.data;
    } catch (err) {
        return err;
    }
}

export async function fetchAbDefaultWhitelistedContract(network: Network): Promise<any> {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);

    let afm = getAssetForwarderAddress(network);
    let queryMessage = JSON.stringify({ "fetch_all_white_listed": {} });

    let request = {
        address: afm,
        queryData: toUtf8(queryMessage),
    };
    try {
        let queryResponse = await wasmClient.fetchSmartContractState(
            request.address,
            request.queryData
        );
        return queryResponse;
    } catch (err) {
        return err;
    }
}

async function unitTesting() {
    // ALL Contracts
    // fetchMultiChainConfig(Network.Mainnet);

    // Gateway Contracts
    console.log("Calling fetchAfDefaultWhitelistedContract...");
    const afContracts = await fetchAfDefaultWhitelistedContract(Network.AlphaDevnet);
    console.log(afContracts);
}

// unitTesting()