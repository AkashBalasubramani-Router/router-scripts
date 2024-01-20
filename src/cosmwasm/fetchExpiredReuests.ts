import {
    toUtf8,
    ChainGrpcWasmApi,
    getEndpointsForNetwork,
    Network,
    NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";
import { getAssetForwarderAddress } from "../constants";

export async function performQuery(
    network: Network,
    address: string,
    queryMessage: string,
) {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    try {
        let fundDepositRequests = await wasmClient.fetchSmartContractState(
            address,
            toUtf8(queryMessage)
        );
        return fundDepositRequests;
    } catch (err) {
        console.log(`Error in fetch query, ${network} ${address} ${queryMessage} ${err}`);
    }
}

export async function fetchFundDepositRequests(network: Network): Promise<Record<string, any>> {
    let endpoint: NetworkEndpoints = getEndpointsForNetwork(network);
    let wasmClient: ChainGrpcWasmApi = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
    
    let afm = getAssetForwarderAddress(network);
    let start_key = "0000000000000000000000000000000000000000000000000000000000000000";
    let limit = 450;
    let is_pending = true;
    let query = {
        "fetch_fund_deposit_req": {
          "start_key": start_key,
          "is_pending": is_pending,
          "limit": limit
        }
    };
    let requests = [];
    while (start_key != "") {
        let fundDepositRequests = await performQuery(network, afm, JSON.stringify(query));
        let reqArray: any[] = fundDepositRequests["data"][0];
        requests = requests.concat(reqArray);
        start_key = fundDepositRequests["data"][1];
        console.log(reqArray.length, start_key);
        query = {
            "fetch_fund_deposit_req": {
              "start_key": start_key,
              "is_pending": is_pending,
              "limit": limit
            }
        };
    }
    let i = 0 ;
    while (i < requests.length) {
        let req = requests[i];
        i = i + 1;
        if (req[1].src_chain_id == "534352") { 
            // 534352
            console.log(req);
        }
        
    }
    return requests;
}

async function unitTesting() {
    // ALL Contracts
    // fetchMultiChainConfig(Network.Mainnet);

    // Gateway Contracts
    console.log("Calling fetchFundDepositRequests...");
    const afContracts = await fetchFundDepositRequests(Network.Mainnet);
    console.log(afContracts);   
}

unitTesting()