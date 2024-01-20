import { Network } from "@routerprotocol/router-chain-sdk-ts";

export const multiChainUrlSuffix =
  "/router-protocol/router-chain/multichain/contract_config";

export function getAssetForwarderAddress(network: Network): string {
  switch (network) {
    case Network.AlphaDevnet:
      return "router12fykm2xhg5ces2vmf4q2aem8c958exv3v0wmvrspa8zucrdwjedsjnnxzt";
    case Network.Devnet:
      return "router12fykm2xhg5ces2vmf4q2aem8c958exv3v0wmvrspa8zucrdwjedsjnnxzt";
    case Network.Testnet:
      return "router17hlelrccxutnpe6u0gw2tk52f6ekrwenmz9amyhhfsq2v24mhkzquuwu99";
    case Network.Mainnet:
      return "router14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s00ztvk";
  }
}

export function getAssetBridgeAddress(network: Network): string {
  switch (network) {
    case Network.AlphaDevnet:
      return "router1qa4hswlcjmttulj0q9qa46jf64f93pecl6tydcsjldfe0hy5ju0sssqper";
    case Network.Devnet:
      return "router1qa4hswlcjmttulj0q9qa46jf64f93pecl6tydcsjldfe0hy5ju0sssqper";
    case Network.Testnet:
      return "router1mwdk9neca5stxfk508enc3y7g85gh2k05txeppsscjwxtnau7qlss4pnmj";
    case Network.Mainnet:
      return "router17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgsmpev85";
  }
}

export function getRPC(chainId: string): [string, string] {
  switch (chainId) {
    case "80001":
      return ["EVM", "https://polygon-testnet.public.blastapi.io"];
    case "56":
      return ["EVM", "https://bsc-dataseed.binance.org/"];
    case "43114":
      return ["EVM", "https://api.avax.network/ext/bc/C/rpc"];
    case "42161":
      return ["EVM", "https://arbitrum-mainnet.infura.io/v3/fd9c5dbc69de41048405e7072cda9bf9"];
    case "10":
      return ["EVM", "https://mainnet.optimism.io"];
    case "250":
      return ["EVM", "https://rpc.ankr.com/fantom"];
    case "5":
      return ["EVM", "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"];
    case "11155111":
      return ["EVM", "https://rpc2.sepolia.org"];
    case "97":
      return ["EVM", "https://goerli.base.org"];
    case "534352":
      return ["EVM", "https://rpc.scroll.io"];
    case "43113":
      return ["EVM", "https://rpc.ankr.com/avalanche_fuji"];
    case "1101":
      return ["EVM", "https://rpc.ankr.com/polygon_zkevm"];
    case "137":
      return ["EVM", "https://polygon-mainnet.g.alchemy.com/v2/hCz4x1BLpLDP3NoomXivfaqND37qCSgS"];
    case "324":
      return ["EVM", "https://mainnet.era.zksync.io"];
    case "59144":
      return ["EVM", "https://rpc.linea.build"];
    case "8453":
      return ["EVM", "https://mainnet.base.org"];
    case "534353":
      return ["EVM", "https://alpha-rpc.scroll.io/l2"];
    case "2494104990":
      return ["TRON", "https://api.shasta.trongrid.io"];
    case "728126428":
      return ["TRON", "https://api.trongrid.io"];
    case "420":
      return ["EVM", "https://optimism-goerli.publicnode.com"];
    case "1442":
      return ["EVM", "https://rpc.public.zkevm-test.net"];
    case "1313161554":
      return ["EVM", "https://1rpc.io/aurora"];
    case "169":
      return ["EVM", "https://pacific-rpc.manta.network/http"];
    case "30":
      return ["EVM", "https://public-node.rsk.co"];
    case "5000":
      return ["EVM", "https://rpc.mantle.xyz"];
    case "59140":
      return ["EVM", "https://rpc.goerli.linea.build"];
    case "280":
      return ["EVM", ""];
    case "3448148188":
      return ["TRON", "https://rpc.public.zkevm-test.net	"];

    case "near-testnet":
      return ["NEAR", "https://rpc.public.zkevm-test.net	"];

    case "osmo-test-5":
      return ["COSMOS", "https://rpc.public.zkevm-test.net	"];

    case "421613":
      return ["EVM", "https://arbitrum-goerli.public.blastapi.io"];
    default:
      console.log(`Please add RPC config for chainId ->${chainId}`);
      return ["", ""];
  }
}

export function getApiAndKey(chainId: string): [string, string, string] {
  switch (chainId) {
    default:
      console.log(`Please add RPC config for chainId ->${chainId}`);
      return ["ETHERSCAN", "", ""];
  }
}