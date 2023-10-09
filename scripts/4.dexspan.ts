import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// Polygon Mumbai RPC URL
const rpcUrl = "https://rpc-mumbai.maticvigil.com";

// Create an Ethereum provider
const provider = new ethers.JsonRpcProvider(rpcUrl);

// Contract address

async function queryStateVariable(
  contractAddress: string,
  variableName: string,
  targetAddress: string
) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      ["function " + variableName + "() view returns (address)"],
      provider
    );

    const stateVariableValue = await contract[variableName]();
    const queriedAddress = stateVariableValue.toLowerCase();
    console.log(`${variableName}:`, queriedAddress);

    if (queriedAddress === targetAddress.toLowerCase()) {
      console.log(
        `Queried address matches the target address: ${targetAddress}`
      );
    } else {
      console.log(`Queried address does not match the target address.`);
    }
  } catch (error) {
    console.error(`Error querying ${variableName}:`, error);
  }
}

const contractAddress = process.env.DEXSPAN_ADDRESS as string;
const targetAddress = "0x7B2AE36e2381ba23e497c803c4b7da401dcabb5a";

// Call the function to query the state variable and validate
queryStateVariable(contractAddress, "assetForwarder", targetAddress);
