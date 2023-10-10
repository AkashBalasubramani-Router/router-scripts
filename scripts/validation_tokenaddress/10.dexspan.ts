import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const rpcUrl = process.env.RPC_URL_T;

const provider = new ethers.JsonRpcProvider(rpcUrl);

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

const contractAddress = process.env.DEXSPAN_ADDRESS_T as string;
const targetAddress = process.env.ASSET_BRIDGE as string;

queryStateVariable(contractAddress, "assetBridge", targetAddress);
