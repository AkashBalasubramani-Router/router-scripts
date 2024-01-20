import {
  ChainGrpcWasmApi,
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  Network,
  NetworkEndpoints,
} from "@routerprotocol/router-chain-sdk-ts";

let wasmClient: ChainGrpcWasmApi;

export function getEndpoint(env: string) {
  let endpoint: NetworkEndpoints;

  if (env == "devnet") {
    endpoint = getEndpointsForNetwork(Network.Devnet);
  } else if (env == "alpha") {
    endpoint = getEndpointsForNetwork(Network.AlphaDevnet);
  } else if (env == "testnet") {
    endpoint = getEndpointsForNetwork(Network.Testnet);
  } else if (env == "mainnet") {
    endpoint = getEndpointsForNetwork(Network.Mainnet);
  } else {
    throw new Error(
      "your env does not match either devnet, alpha, testnet or mainnet"
    );
  }

  return endpoint;
}

export function getChainId(env: string) {
  let chainId: string;

  if (env == "devnet") {
    chainId = getChainInfoForNetwork(Network.Devnet).chainId;
  } else if (env == "alpha") {
    chainId = getChainInfoForNetwork(Network.AlphaDevnet).chainId;
  } else if (env == "testnet") {
    chainId = getChainInfoForNetwork(Network.Testnet).chainId;
  } else if (env == "mainnet") {
    chainId = getChainInfoForNetwork(Network.Mainnet).chainId;
  } else {
    throw new Error(
      "your env does not match either devnet, alpha, testnet or mainnet"
    );
  }

  return chainId;
}
