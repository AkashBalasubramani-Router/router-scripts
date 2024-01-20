import axios from "axios";
import {
  ChainGrpcWasmApi,
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  Network,
  toUtf8,
} from "@routerprotocol/router-chain-sdk-ts";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function fetchAndFilterData(
  targetContractAddress: string,
  targetChainId: string
): Promise<boolean> {
  try {
    const url = process.env.LCD_URL as string;

    const response = await axios.get(url);
    const data = response.data;

    if (data && data.contractConfig) {
      const matchingContracts = data.contractConfig.filter((contract: any) => {
        return (
          contract.contractAddress === targetContractAddress &&
          contract.chainId === targetChainId
        );
      });

      if (matchingContracts.length > 0) {
        const firstMatchingContract = matchingContracts[0];
        if (
          firstMatchingContract.contract_enabled &&
          firstMatchingContract.contractType === process.env.CONTRACT_TYPE
        ) {
          console.log("Contract is enabled");
        } else {
          console.log("Contract is not enabled");
          return false;
        }
      } else {
        console.log(
          "Contract not found for the specified contractAddress and chainId."
        );
        return false;
      }
    } else {
      console.log("Data or contractConfig not found in the response.");
      return false;
    }

    let wasmClient: ChainGrpcWasmApi;
    const endpoint = getEndpointsForNetwork(Network.Testnet);
    endpoint.lcdEndpoint;
    const chainId = getChainInfoForNetwork(Network.Testnet).chainId;
    const middleware = process.env.MIDDLEWARE_ADDRESS as string;
    const function1 = toUtf8(JSON.stringify({ fetch_all_white_listed: {} }));

    async function queryWhiteListedContracts(): Promise<boolean> {
      wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
      const querying = await wasmClient.fetchSmartContractState(
        middleware,
        function1
      );

      // Check if the given chainId and address are present in the data
      const targetContractAddress = process.env.COSM_WASM as string;
      const targetChainId = process.env.CHAINID as string;

      const isPresent = querying.data.some((entry: [string[], boolean]) => {
        const [chainIdInData, addressInData] = entry[0];
        return (
          chainIdInData === targetChainId &&
          addressInData === targetContractAddress
        );
      });

      if (isPresent) {
        console.log(
          `ChainId: ${targetChainId} and Address: ${targetContractAddress} are present in the data.`
        );
      } else {
        console.log(
          `ChainId: ${targetChainId} and Address: ${targetContractAddress} are not present in the data.`
        );
        return false;
      }

      const rpcUrl = process.env.RPC_URL;
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      async function queryStateVariable( //@make seperate fns
        contractAddress: string,
        variableName: string,
        targetAddress: string
      ): Promise<boolean> {
        try {
          const contract = new ethers.Contract(
            contractAddress,
            ["function " + variableName + "() view returns (address)"],
            provider
          );

          const stateVariableValue = await contract[variableName]();
          const queriedAddress = stateVariableValue.toLowerCase();

          if (queriedAddress === targetAddress.toLowerCase()) {
            console.log(
              `Queried address matches the target address: ${targetAddress}`
            );
            return true;
          } else {
            console.log(`Queried address does not match the target address.`);
            return false;
          }
        } catch (error) {
          console.error(`Error querying ${variableName}:`, error);
          return false;
        }
      }

      const contractAddress = process.env.DEXSPAN_ADDRESS as string;
      const targetAddress = "0x7B2AE36e2381ba23e497c803c4b7da401dcabb5a";

      return await queryStateVariable(
        //@make it generic
        contractAddress,
        "assetForwarder",
        targetAddress
      );
    }

    return await queryWhiteListedContracts();
  } catch (error) {
    console.error("Error in fetchAndFilterData:", error);
    return false;
  }
}

const targetContractAddress1 = process.env.CONTRACTADDRESS as string;
const targetChainId1 = process.env.CHAINID as string;

async function checkAllConditions(): Promise<boolean> {
  const result = await fetchAndFilterData(
    targetContractAddress1,
    targetChainId1
  );
  if (result) {
    console.log("Verified and all conditions passed");
    return true;
  } else {
    console.log("At least one condition failed.");
    return false;
  }
}

checkAllConditions();
