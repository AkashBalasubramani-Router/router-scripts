// import axios from "axios";
// import { Event } from "@ethersproject/contracts";
// import { ethers, Provider, Network, Contract, ContractEventName } from "ethers";
// import { sleep } from "@routerprotocol/router-chain-sdk-ts";
// require("dotenv").config();

// //   const recipientAddress = ethers.zeroPadValue(
// //     "0x4E27128CdEF7a3CFFdF800BE3Be6EE74639CB639",
// //     32
// //   );

// const forwarderABI = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "partnerId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "destChainIdBytes",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "depositId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "usdcNonce",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "srcToken",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "recipient",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "depositor",
//         type: "address",
//       },
//     ],
//     name: "iUSDCDeposited",
//     type: "event",
//   },
// ];

// const transmitterABI = [
//   {
//     inputs: [
//       {
//         internalType: "bytes",
//         name: "message",
//         type: "bytes",
//       },
//       {
//         internalType: "bytes",
//         name: "attestation",
//         type: "bytes",
//       },
//     ],
//     name: "receiveMessage",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "success",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// class FallbackEVMClient {
//   private network: Network;
//   private providers: Provider[] = [];
//   private assetBridgeInstance: Contract;
//   private transmitterInstance: Contract;
//   private filters: ContractEventName;
//   private signer: ethers.Wallet;
//   private maxRange: number = 1000;

//   constructor(
//     rpcs: string[],
//     assetBridgeAddress: string,
//     transmitterAddress: string,
//     privateKey: string
//   ) {
//     rpcs.map((rpc) => {
//       this.providers.push(new ethers.JsonRpcProvider(rpc));
//     });
//     this.signer = new ethers.Wallet(privateKey, this.providers[0]);
//     this.assetBridgeInstance = new ethers.Contract(
//       assetBridgeAddress,
//       forwarderABI,
//       this.signer
//     );

//     (async () => {
//       this.network = await this.providers[0].getNetwork();
//       //   const iUSDCDepositedTopic = ethers.id(
//       //     "iUSDCDeposited(uint256,uint256,bytes32,uint256,uint256,address,bytes32,address)"
//       //   );
//       //   const msgSentTopic = ethers.id("MessageSent(bytes)");
//       //   this.filters = {
//       //     address: await assetBridgeInstance.getAddress(),
//       //     topics: [iUSDCDepositedTopic, [msgSentTopic]],
//       //   };
//       //   console.log(this.filters);
//     })();

//     this.transmitterInstance = new ethers.Contract(
//       transmitterAddress,
//       transmitterABI,
//       this.signer
//     );
//     this.filters = this.assetBridgeInstance.filters.iUSDCDeposited();
//   }

//   async getBlockNumber(): Promise<number> {
//     //#max twice
//     for (let idx = 0; idx < 2; idx++) {
//       const responses = await Promise.allSettled(
//         this.providers.map(async (provider) => {
//           return await provider.getBlockNumber();
//         })
//       );

//       const fulfilledResponses = responses
//         .filter((response) => response.status === "fulfilled")
//         //@ts-ignore
//         .map((response) => response.value);

//       console.log(fulfilledResponses);

//       // Check if more than 50% of providers returned data
//       const successThreshold = Math.ceil(this.providers.length / 2);
//       if (
//         fulfilledResponses.length >= successThreshold &&
//         successThreshold > 0 // successThreshold should be atleast 1
//       ) {
//         // Merge all events from successful providers and take the union
//         const allBlockNumbers: number[] = fulfilledResponses.reduce(
//           (all, blockNumber) => all.concat(blockNumber),
//           []
//         );
//         allBlockNumbers.sort();
//         return allBlockNumbers[Math.floor(allBlockNumbers.length / 2)]; // taking median
//       } else {
//         console.log(
//           `RPCs Failed | ChainId : ${this.network.chainId} :: ChainName : ${this.network.name} |, Retrying after 1 sec`
//         );
//         await sleep(1000); // retrying after 1 sec
//         continue;
//       }
//     }
//     throw "All Rpc Failed, Retry Upper Promise Or Exit";
//   }

//   async queryFilter(startBlock: number, endBlock: number): Promise<Event[]> {
//     //#max twice
//     for (let idx = 0; idx < 2; idx++) {
//       const responses = await Promise.allSettled(
//         this.providers.map(async (provider) => {
//           return await this.assetBridgeInstance
//             .connect(provider)
//             .queryFilter(this.filters, startBlock, endBlock);
//         })
//       );
//       const fulfilledResponses = responses
//         .filter((response) => response.status === "fulfilled")
//         //@ts-ignore
//         .map((response) => response.value);

//       // Check if more than 50% of providers returned data
//       const successThreshold = Math.ceil(this.providers.length / 2);
//       if (
//         fulfilledResponses.length >= successThreshold &&
//         successThreshold > 0 // successThreshold should be atleast 1
//       ) {
//         // Merge all events from successful providers and take the union
//         const allEvents = fulfilledResponses.reduce(
//           (all, events) => all.concat(events),
//           []
//         );
//         return this.takeUnionOfEvents(allEvents);
//       } else {
//         console.log(
//           `RPCs Failed | ChainId : ${this.network.chainId} :: ChainName : ${this.network.name} |, Retrying after 1 sec`
//         );
//         await sleep(1000); // retrying after 1 sec
//         continue;
//       }
//     }
//     throw "All Rpc Failed, Retry Upper Promise Or Exit";
//   }

//   private takeUnionOfEvents(events: Event[]): Event[] {
//     const eventSet = new Set<string>();
//     const uniqueEvents: Event[] = [];
//     events.forEach((event) => {
//       const eventKey = event.transactionHash + event.topics.join("");
//       if (!eventSet.has(eventKey)) {
//         eventSet.add(eventKey);
//         uniqueEvents.push(event);
//       }
//     });
//     return uniqueEvents;
//   }

//   async getStartAndEndBlock(lastQueriedBlock: number): Promise<{
//     startBlock: number;
//     endBlock: number;
//   }> {
//     const currentBlockNumber = await this.getBlockNumber();
//     let endBlock: number = currentBlockNumber;
//     if (lastQueriedBlock + this.maxRange <= currentBlockNumber)
//       endBlock = lastQueriedBlock + this.maxRange;
//     return { startBlock: lastQueriedBlock, endBlock };
//   }

//   async getTransactionReceipt(txHash: string): Promise<any> {
//     return this.providers[0].getTransactionReceipt(txHash);
//   }

//   async simulate(messageBytes: string, attestation: string): Promise<boolean> {
//     try {
//       await this.transmitterInstance.receiveMessage.staticCall(
//         messageBytes,
//         attestation
//       );
//       return true;
//     } catch (err) {
//       return false;
//     }
//   }
//   async receiveMessage(
//     messageBytes: string,
//     attestation: string
//   ): Promise<any> {
//     if (await this.simulate(messageBytes, attestation)) {
//       const tx = await this.transmitterInstance.receiveMessage(
//         messageBytes,
//         attestation,
//         { gasPrice: "35000000000" }
//       );
//       return tx.wait(2);
//     } else return null;
//   }
// }

// class Node<T> {
//   value: T;
//   next: Node<T> | null = null;

//   constructor(value: T) {
//     this.value = value;
//   }
// }

// class CircularDeque<T> {
//   private maxSize: number;
//   private size: number = 0;
//   private front: Node<T> | null = null;
//   private rear: Node<T> | null = null;

//   constructor(maxSize: number) {
//     this.maxSize = maxSize;
//   }

//   isEmpty(): boolean {
//     return this.size === 0;
//   }

//   isFull(): boolean {
//     return this.size === this.maxSize;
//   }

//   length(): number {
//     return this.size;
//   }

//   pushFront(item: T): boolean {
//     if (!this.isFull()) {
//       const newNode = new Node(item);
//       if (this.isEmpty()) {
//         newNode.next = newNode;
//         this.front = newNode;
//         this.rear = newNode;
//       } else {
//         newNode.next = this.front;
//         this.front = newNode;
//         this.rear!.next = newNode;
//       }
//       this.size++;
//       return true;
//     } else {
//       return false; // Deque is full
//     }
//   }

//   pushBack(item: T): boolean {
//     if (!this.isFull()) {
//       const newNode = new Node(item);
//       if (this.isEmpty()) {
//         newNode.next = newNode;
//         this.front = newNode;
//         this.rear = newNode;
//       } else {
//         newNode.next = this.front;
//         this.rear!.next = newNode;
//         this.rear = newNode;
//       }
//       this.size++;
//       return true;
//     } else {
//       return false; // Deque is full
//     }
//   }

//   popFront(): boolean {
//     if (!this.isEmpty()) {
//       if (this.size === 1) {
//         this.front = null;
//         this.rear = null;
//       } else {
//         this.front = this.front!.next;
//         this.rear!.next = this.front;
//       }
//       this.size--;
//       return true;
//     } else {
//       return false; // Deque is empty
//     }
//   }

//   popBack(): boolean {
//     if (!this.isEmpty()) {
//       if (this.size === 1) {
//         this.front = null;
//         this.rear = null;
//       } else {
//         let current = this.front;
//         while (current!.next !== this.rear) {
//           current = current!.next;
//         }
//         current!.next = this.front;
//         this.rear = current;
//       }
//       this.size--;
//       return true;
//     } else {
//       return false; // Deque is empty
//     }
//   }

//   getFront(): T | undefined {
//     return this.front?.value;
//   }

//   getBack(): T | undefined {
//     return this.rear?.value;
//   }
// }

// type ThreadType = {
//   messageHash: string;
//   messageBytes: string;
//   destChainId: string;
//   partnerId: BigInt;
//   amount: BigInt;
//   attestation?: string;
// };

// class CCTP {
//   evmClients: Object = {}; // {chainId:FallbackEVMClient}
//   evmKeys: string[] = [];
//   lastQueriedBlock: number = 0;
//   localChainInfos: Object = {}; // {chainId: {lastQueriedBlock:number}}
//   lockListen: boolean = false;
//   lockAttestation: boolean = false;
//   lockTransmit: boolean = false;
//   threadOfTx: CircularDeque<ThreadType>;
//   blockedTx: CircularDeque<ThreadType>;
//   maxThreadSize: number = 2000;
//   txAttestations: Object = {};
//   eventMessageTopic: string;

//   constructor(
//     config: Object, // [{chainId, contract:"",rpcArray:[]}]
//     privateKey: string
//   ) {
//     this.eventMessageTopic = ethers.id("MessageSent(bytes)");
//     this.threadOfTx = new CircularDeque<ThreadType>(this.maxThreadSize);
//     this.blockedTx = new CircularDeque<ThreadType>(this.maxThreadSize);

//     Object.keys(config).map((key) => {
//       this.evmClients[key] = new FallbackEVMClient(
//         config[key].rpcs,
//         config[key].contractAddress,
//         config[key].transmitterAddress,
//         privateKey
//       );
//       this.localChainInfos[key] = {
//         lastQueriedBlock: Number(config[key].startBlock),
//       };
//     });
//   }

//   // listen every 2second for events
//   async listen() {
//     setInterval(() => {
//       (async () => {
//         if (this.lockListen) return;
//         this.lockListen = true;
//         await Promise.all(
//           Object.keys(this.localChainInfos).map(async (chainId) => {
//             const { startBlock, endBlock } = await this.evmClients[
//               chainId
//             ].getStartAndEndBlock(
//               this.localChainInfos[chainId].lastQueriedBlock
//             );
//             console.log(
//               `[${chainId}]: Fetching Events From, StartBlock: ${startBlock} || EndBlock: ${endBlock}`
//             );
//             const events = await this.evmClients[chainId].queryFilter(
//               startBlock,
//               endBlock
//             );
//             console.log(
//               `[${chainId}]: Fetching Events From, StartBlock: ${startBlock} || EndBlock: ${endBlock},  NoOfEvents: ${events.length}`
//             );

//             this.localChainInfos[chainId] = {
//               ...this.localChainInfos[chainId],
//               lastQueriedBlock: endBlock - 1,
//             };
//             await Promise.all(
//               events.map(async (event: Event) => {
//                 const txHash = event.transactionHash;
//                 if (this.txAttestations[txHash]) {
//                   return;
//                 }
//                 let messageHash;
//                 let messageBytes;

//                 try {
//                   const transactionReceipt = await this.evmClients[
//                     chainId
//                   ].getTransactionReceipt(txHash);
//                   const eventTopic = ethers.id("MessageSent(bytes)");

//                   if (transactionReceipt) {
//                     const log = transactionReceipt.logs.find(
//                       (l) => l.topics[0] === eventTopic
//                     );
//                     if (log) {
//                       const abi = new ethers.AbiCoder();
//                       messageBytes = abi.decode(["bytes"], log.data)[0];
//                       messageHash = ethers.keccak256(messageBytes);
//                     }
//                   }
//                 } catch (error) {
//                   console.error(error);
//                 }
//                 interface MyEvent extends Event {
//                   args: {
//                     destChainIdBytes: string; // Replace with the actual type
//                     partnerId: string; // Replace with the actual type
//                     amount: string; // Replace with the actual type
//                     // Add other properties as needed
//                   };
//                 }

//                 if (messageHash && messageBytes) {
//                   const srcTxInfo = {
//                     messageHash: messageHash,
//                     destChainId: event.args.destChainIdBytes,
//                     partnerId: event.args.partnerId,
//                     amount: event.args.amount,
//                     messageBytes: messageBytes,
//                   };
//                   if (this.threadOfTx.pushBack(srcTxInfo)) {
//                     this.txAttestations[event.transactionHash] = srcTxInfo;
//                   }
//                 }
//               })
//             );
//           })
//         );
//         this.lockListen = false;
//       })();
//     }, 2000);
//   }

//   // fetch attestation  every 2secons
//   async fetchAttestation() {
//     // txAttestations
//     setInterval(() => {
//       if (this.threadOfTx.isEmpty() || this.lockAttestation) return;
//       this.lockAttestation = true;
//       (async () => {
//         const info = this.threadOfTx.getFront();
//         const { messageHash } = info;
//         let attestationResponse = { status: "pending", attestation: "" };
//         const response = await axios.get(
//           `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
//         );
//         attestationResponse = response.data;
//         if (attestationResponse && attestationResponse.status == "complete") {
//           this.threadOfTx.popFront();
//           this.threadOfTx.pushFront({
//             ...info,
//             attestation: attestationResponse.attestation,
//           });
//         }
//         this.lockAttestation = false;
//       })();
//     }, 2000);
//   }

//   // send it to dest chain
//   transmit() {
//     setInterval(async () => {
//       if (this.lockTransmit || this.threadOfTx.isEmpty()) return;
//       this.lockTransmit = true;
//       const front = this.threadOfTx.getFront();
//       if (front.attestation) {
//         const destChainId = ethers
//           .toUtf8String(front.destChainId)
//           .replace(/[^\x20-\x7E]/g, "")
//           .trim();
//         if (!this.evmClients[destChainId]) {
//           this.blockedTx.pushBack(front);
//           this.threadOfTx.popFront();
//           return;
//         }
//         const info = await this.evmClients[destChainId].receiveMessage(
//           front.messageBytes,
//           front.attestation
//         );
//         if (info)
//           console.log(`TxSent: DestChainIf: ${destChainId} :: ${info.hash}`);
//         else
//           console.log(
//             ` [${destChainId}]: Tx Simulation Failed, MessageHash: ${front.messageHash}`
//           );
//         this.threadOfTx.popFront();
//       }
//       this.lockTransmit = false;
//     }, 2000);
//   }
// }

// (async () => {
//   // fetch asset brige contract from api
//   // returns {chainId: {contractAddress: "",startBlock: 0,transmitterAddress:""}}
//   //TODO: hardcoding for now
//   const chainInfos = {
//     "43113": {
//       contractAddress: "0xDA27205B5bDFFe6186da1d9350bf39eC541cA8CF",
//       startBlock: 26564108,
//       transmitterAddress: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
//     },
//     "5": {
//       contractAddress: "0xB8c8641570Fe03FA2b35E1003d6caf745b6D7FC7", // asset bridge address
//       startBlock: 9814675,
//       transmitterAddress: "0x26413e8157CD32011E726065a5462e97dD4d03D9",
//     },
//   };

//   const config = {};
//   Object.keys(chainInfos).map((key) => {
//     config[key] = {
//       ...chainInfos[key],
//       rpcs: process.env[key]
//         .replace(/\n/g, "")
//         .replace(/'/g, '"')
//         .replace(/\\/g, "")
//         .split(",")
//         .map((rpc) => rpc.trim()),
//     };
//   });
//   console.log(config);

//   const obj = new CCTP(config, process.env.PRIVATE_KEY);
//   obj.listen(); // it will be listening events
//   obj.fetchAttestation(); // it will be listening events
//   obj.transmit(); // transmitting to messageTransmitter
// })();
