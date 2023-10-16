import {
  NetworkEndpoints,
  ChainRestAuthApi,
  MsgExecuteContract,
  createTransaction,
  BigNumberInBase,
  PrivateKey,
  TxRestClient,
  privateKeyToPublicKeyBase64,
  TxGrpcClient,
  TxClientSimulateResponse,
} from "@routerprotocol/router-chain-sdk-ts";
import { getChainId, getEndpoint } from "./utils";

async function sendMessage({
  env,
  contractAddr,
  action,
  data,
}: {
  env: string;
  contractAddr: string;
  action: string;
  data: any;
}) {
  let endpoint: NetworkEndpoints = getEndpoint(env);

  const chainId = getChainId(env);
  const privateKeyHash = process.env.PRIVATE_KEY;

  if (!privateKeyHash) {
    throw new Error("Please set your PRIVATE_KEY in the .env file");
  }
  const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

  const alice = privateKey.toBech32();

  const publicKey = privateKeyToPublicKeyBase64(
    Buffer.from(privateKeyHash, "hex")
  );

  const restClient = new TxRestClient(endpoint.lcdEndpoint);

  /** Get Faucet Accounts details */
  const aliceAccount = await new ChainRestAuthApi(
    endpoint.lcdEndpoint
  ).fetchAccount(alice);

  const executeContractMsg = MsgExecuteContract.fromJSON({
    sender: alice,
    action: action,
    contractAddress: contractAddr,
    msg: data,
  });

  let simulationResponse: TxClientSimulateResponse;
  {
    let { txRaw } = createTransaction({
      message: executeContractMsg.toDirectSign(),
      memo: "",
      pubKey: publicKey,
      sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
      accountNumber: parseInt(
        aliceAccount.account.base_account.account_number,
        10
      ),
      chainId: chainId,
    });

    txRaw.setSignaturesList([""]);
    const grpcClient = new TxGrpcClient(endpoint.grpcEndpoint);
    simulationResponse = await grpcClient.simulate(txRaw);
  }
  let amount = new BigNumberInBase(500000001)
    .times(parseInt((simulationResponse.gasInfo.gasUsed * 1.3).toString()))
    .toString();
  let gas = parseInt(
    (simulationResponse.gasInfo.gasUsed * 1.3).toString()
  ).toString();
  console.log("route amount and gas: ", amount, gas);

  const { signBytes, txRaw } = createTransaction({
    message: executeContractMsg.toDirectSign(),
    memo: "",
    fee: {
      amount: [
        {
          amount: amount,
          denom: "route",
        },
      ],
      gas: gas,
    },
    pubKey: publicKey,
    sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
    accountNumber: parseInt(
      aliceAccount.account.base_account.account_number,
      10
    ),
    chainId: chainId,
  });

  /** Sign transaction */
  const signature = await privateKey.sign(signBytes);

  /** Append Signatures */
  txRaw.setSignaturesList([signature]);

  /** Broadcast transaction */
  let txxResponse = await restClient.broadcast(txRaw);
  let txResponse = await restClient.waitTxBroadcast(txxResponse.txhash);
  console.log(`txResponse =>`, txResponse);
}

export default sendMessage;
