import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
// Define the contractAddress and chainId you want to search for

// Define the URL
const url =
  "https://lcd.testnet.routerchain.dev/router-protocol/router-chain/multichain/contract_config";

// Function to fetch and filter the data
async function fetchAndFilterData(
  targetContractAddress: string,
  targetChainId: string
) {
  try {
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
        if (firstMatchingContract.contract_enabled) {
          console.log("Contract is enabled:");
        } else {
          console.log("Contract is not enabled:");
        }
      } else {
        console.log(
          "Contract not found for the specified contractAddress and chainId."
        );
      }
    } else {
      console.log("Data or contractConfig not found in the response.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to fetch and filter data
const targetContractAddress1 = process.env.CONTRACTADDRESS as string;
const targetChainId1 = process.env.CHAINID as string;
fetchAndFilterData(targetContractAddress1, targetChainId1);
