import { getApiAndKey, getRPC } from "../constants";
import { Network } from "@routerprotocol/router-chain-sdk-ts";
import { fetchActiveAssetForwarderContract } from "../lcd/queryMultiChainConfig";
import { fetchAfDefaultWhitelistedContract } from "../cosmwasm/queries";
import { writeFileSync } from "fs-extra";

async function networkCall(url: string): Promise<any[]> {
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result["result"];
    })
    .catch(error => {
      console.log('error', error);
      return [];
    });
}


export async function fetchTxnLists(
  contract: string,
  chainId: string,
  startblock: string,
  endblock: string
): Promise<any[]> {
  const [chainType, rpcURL] = getRPC(chainId);
  const [explorerType, api, key] = getApiAndKey(chainId);
  const avgData: Map<string, [number, number]> = new Map();
  if (chainType != "EVM") {
    return [];
  }

  if (!api) {
    console.error(`Invalid  api ${chainId}, Refer config.json`);
    return [];
  }
  let url = `${api}?module=account&action=txlist&address=${contract}`;

  if (explorerType == "BLOCKSCOUT") {
    if (startblock) url += `&start_block=${startblock}`;
    if (endblock) url += `&end_block=${endblock}`;
  } else if (explorerType == "ETHERSCAN") {
    if (!key) {
      console.error(`Invalid  key ${chainId}, Refer config.json`);
      return [];
    }
    url += `&apikey=${key}`;
    if (startblock) url += `&startBlock=${startblock}`;
    if (endblock) url += `&endBlock=${endblock}`;
  }
  url += `&page=0`;
  url += `&offset=0`;
  url += `&sort=desc`;

  console.log(url);
  const list: any[] = await networkCall(url);
  
  const txLists = [];
  for (let idx = 0; idx < list.length; idx++) {
    let methodId = list[idx].input.slice(0, 10);
    txLists.push([
      chainId,
      contract,
      idx,
      methodId,
      list[idx].gas,
      list[idx].gasUsed,
      list[idx].hash,
    ]);
    let currentData = avgData.get(methodId) || [0, 0];
    avgData.set(methodId, [Number(currentData[0]) + Number(list[idx].gasUsed), currentData[1] + 1])
  }
  avgData.forEach((value: [number, number], key: string) => {
    console.log(`avg Gas Limit for method ${key} is ${value[0] / value[1]}`)
  })
  return txLists;
};

async function fetchContractGasLimitData(network: Network) {
  console.log("Calling fetchActiveAssetForwarderContract...");
  const afContracts: any[] = await fetchActiveAssetForwarderContract(network);

  let jsonData = [];
  jsonData.push(["ChainId", "ContractAddress", "SR", "MethodId", "GasPased", "GasUsed", "Hash"]);
  for (let i = 0; i < afContracts.length; i++) {
    let contractAddress = afContracts[i].contractAddress;
    let chainId = afContracts[i].chainId;
    let startBlock = afContracts[i].contractHeight;
    let endblock = afContracts[i].lastObservedEventBlockHeight;

    console.log(`\nGas Limit data for ${chainId}-${contractAddress}`);
    
    let txnLists = await fetchTxnLists(contractAddress, chainId, startBlock, endblock);
    jsonData.push(...txnLists);
  }
  
  let csvString = "";
  for( let i =0; i < jsonData.length; i++) {
    let subArray = jsonData[i];
    jsonData[i] = subArray.join(","); 
  }
  csvString = jsonData.join('\r\n');
  writeFileSync(`${__dirname}/evmGasLimitData.csv`, csvString, {
    flag: 'w',
  });
}

fetchContractGasLimitData(Network.Mainnet)
