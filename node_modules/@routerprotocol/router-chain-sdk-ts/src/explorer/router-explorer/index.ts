import {
  getEndpointsForNetwork,
  getNetworkType,
  Network,
} from '../../networks';
import { fromBase64ToString } from '../../utils';
import { CrosschainEvent } from '../constants';
import {
  latestBlockQuery,
  latestTransactionsOfAddressQuery,
  latestTransactionsQuery,
  latestCrosschainsQuery,
  searchSpecificCrosschainChainIdQuery,
  searchSpecificCrosschainDestChainIdQuery,
  searchSpecificCrosschainQuery,
  searchSpecificCrosschainSrcChainIdQuery,
  specificBlockQuery,
  specificCrosschainQuery,
  specificTransactionQuery,
  inboundOutboundQuery,
  latestFundDepositQuery,
  searchSpecificFundDepositQuery,
  searchSpecificFundDepositChainIdQuery,
  searchSpecificFundDepositSrcChainIdQuery,
  searchSpecificFundDepositDestChainIdQuery,
  specificFundDepositQuery,
  latestFundPaidQuery,
  searchSpecificFundPaidQuery,
  searchSpecificFundPaidSrcChainIdQuery,
  specificFundPaidQuery,
  validatorsUptimeQuery,
  latestBlockQueryWithSignatures,
} from '../queries';
import {
  BlockTypeWithTxns,
  CrosschainType,
  FundDepositType,
  FundPaidType,
  InboundOutboundMapType,
  PaginatedBlock,
  PaginatedBlockWithSignature,
  PaginatedCrosschain,
  PaginatedFundDeposit,
  PaginatedFundPaid,
  PaginatedTransaction,
  TransactionType,
  ValidatorUptime,
} from '../types';
import { CancelToken, gqlFetcher, restFetcher } from '../utils';

/**
 * @group Router Scan Utility
 */

export class RouterExplorer {
  public readonly chainEnvironment: Network;
  public readonly applicationAddress: string | null;

  constructor(chainEnvironment: string, applicationAddress: string = '') {
    this.chainEnvironment = getNetworkType(chainEnvironment);
    this.applicationAddress = applicationAddress;
  }

  //Fetch latest blocks from explorer db

  /**
   * Fetches latest Blocks
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedBlock}
   * @throws {Error}
   */
  public async getLatestBlocks(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedBlock: PaginatedBlock }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestBlockQuery,
        {
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async getLatestBlocksWithSignatures(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedBlock: PaginatedBlockWithSignature }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestBlockQueryWithSignatures,
        {
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetches specific Block
   * @param {string} height BlockHeight
   * @return {BlockType}
   * @throws {Error}
   */
  public async getBlockByHeight(
    height: Number,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ block: BlockTypeWithTxns }> {
    try {
      const data = await gqlFetcher(this.chainEnvironment, specificBlockQuery, {
        height: height,
        source,
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches latest Transactions
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedTransaction}
   * @throws {Error}
   */
  public async getLatestTransactions(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedTransaction: PaginatedTransaction }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestTransactionsOfAddressQuery
          : latestTransactionsQuery,
        {
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches latest Transactions for a specific address
   * @param {string} address Address
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedTransaction}
   * @throws {Error}
   */
  public async getLatestTransactionsByAddress(
    address: String,
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedTransaction: PaginatedTransaction }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestTransactionsOfAddressQuery,
        {
          timeRange,
          address: address,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Transaction
   * @param {string} hash
   * @return {Transaction}
   * @throws {Error}
   */
  public async getTransactionByHash(
    hash: String,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ transaction: TransactionType }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificTransactionQuery,
        {
          hash: hash,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetches latest Crosschains
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedCrosschain}
   * @throws {Error}
   */

  public async getLatestCrosschains(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedCrosschain: PaginatedCrosschain }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestCrosschainsQuery,
        {
          address: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Crosschains
   * @param {string} timeRange Time Range
   * @param {string} searchTerm Source Sender or Source Transaction Hash
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedCrosschain}
   * @throws {Error}
   */
  public async getCrosschainBySearch(
    searchTerm: String,
    srcChainIds: string[] = [],
    dstChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedCrosschain: PaginatedCrosschain }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        srcChainIds.length === 0 && dstChainIds.length === 0
          ? searchSpecificCrosschainQuery
          : srcChainIds.length > 0 && dstChainIds.length > 0
          ? searchSpecificCrosschainChainIdQuery
          : srcChainIds.length > 0
          ? searchSpecificCrosschainSrcChainIdQuery
          : dstChainIds.length > 0
          ? searchSpecificCrosschainDestChainIdQuery
          : searchSpecificCrosschainQuery,
        {
          sourceChainIds: srcChainIds,
          destinationChainIds: dstChainIds,
          searchTerm: searchTerm,
          handlerAddress: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Crosschain
   * @param {string} formAttestationId
   * @return {CrosschainType}
   * @throws {Error}
   */
  public async getCrosschainByAttestationId(
    formAttestationId: String,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ crosschain: CrosschainType }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificCrosschainQuery,
        {
          formAttestationId: formAttestationId,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches latest Fund Deposits
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedFundDeposit}
   * @throws {Error}
   */

  public async getLatestFundDeposits(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedFundDeposit: PaginatedFundDeposit }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestFundDepositQuery,
        {
          address: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw new Error(`Error | getLatestFundDeposits | ${e}`);
    }
  }
  /**
   * Fetches specific Fund Deposits
   * @param {string} timeRange Time Range
   * @param {string} searchTerm srcTxHash or contract or srcToken or recipient or depositor
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedFundDeposit}
   * @throws {Error}
   */
  public async getFundDepositBySearch(
    searchTerm: String,
    srcChainIds: string[] = [],
    dstChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedFundDeposit: PaginatedFundDeposit }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        srcChainIds.length === 0 && dstChainIds.length === 0
          ? searchSpecificFundDepositQuery
          : srcChainIds.length > 0 && dstChainIds.length > 0
          ? searchSpecificFundDepositChainIdQuery
          : srcChainIds.length > 0
          ? searchSpecificFundDepositSrcChainIdQuery
          : dstChainIds.length > 0
          ? searchSpecificFundDepositDestChainIdQuery
          : searchSpecificFundDepositQuery,
        {
          sourceChainIds: srcChainIds,
          destinationChainIds: dstChainIds,
          searchTerm: searchTerm,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Fund Deposit
   * @param {string} id
   * @return {FundDepositType}
   * @throws {Error}
   */
  public async getFundDepositById(
    id: String,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ fundDeposit: FundDepositType }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificFundDepositQuery,
        {
          id,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches latest Fund Paid
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedFundPaid}
   * @throws {Error}
   */

  public async getLatestFundPaids(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedFundPaid: PaginatedFundPaid }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestFundPaidQuery,
        {
          address: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Fund Paids
   * @param {string} timeRange Time Range
   * @param {string} searchTerm srcTxHash or contract or srcToken or recipient or depositor
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {PaginatedFundPaid}
   * @throws {Error}
   */
  public async getFundPaidBySearch(
    searchTerm: String,
    srcChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ paginatedFundPaid: PaginatedFundPaid }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        srcChainIds.length === 0
          ? searchSpecificFundPaidQuery
          : srcChainIds.length > 0
          ? searchSpecificFundPaidSrcChainIdQuery
          : searchSpecificFundPaidQuery,
        {
          sourceChainIds: srcChainIds,
          searchTerm: searchTerm,
          timeRange,
          limit: limit,
          offset: offset,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Fund Paid
   * @param {string} id
   * @return {FundDepositType}
   * @throws {Error}
   */
  public async getFundPaidById(
    id: String,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ fundPaid: FundPaidType }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificFundPaidQuery,
        {
          id,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Fetches specific Transaction
   * @param {string} middlewareContract
   * @param {string} inboundId
   * @return {InboundOutboundMapType[]}
   * @throws {Error}
   */
  public async getOutboundsForInbound(
    inboundId: String,
    middlewareContract = this.applicationAddress,
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ outboundToInboundMap: InboundOutboundMapType[] }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        inboundOutboundQuery,
        {
          middlewareContract,
          inboundId,
        },
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetches specific Transaction
   * @return {ValidatorUptime[]}
   * @throws {Error}
   */
  public async getValidatorsUptime(
    { source } = {
      source: CancelToken.source(),
    }
  ): Promise<{ validators: ValidatorUptime[] }> {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        validatorsUptimeQuery,
        source
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetches specific Transaction
   * @param {string} sourceChainId
   * @param {string} nonce
   * @return {InboundOutboundMapType[]}
   * @throws {Error}
   */
  public async getBlockEventsForCrosschain(
    sourceChainId: string,
    nonce: string,
    crosschainEvent: CrosschainEvent
  ): Promise<any> {
    try {
      const crosschainId = sourceChainId + '-' + nonce;
      const crosschainData = await this.getCrosschainByAttestationId(
        crosschainId
      );
      const allEventHistory = [
        ...crosschainData.crosschain.eventHistory,
        ...crosschainData.crosschain.ackRequest.eventHistory,
      ];
      const requiredBlock = allEventHistory.find(
        historyEventHistory =>
          historyEventHistory.name.toLowerCase() ===
          crosschainEvent.toLowerCase()
      )?.height;
      if (!requiredBlock) {
        throw new Error(
          `Error | getBlockEventsForCrosschain | ${crosschainEvent} is not present this crosschain record.`
        );
      }
      return this.getBlockEvents(requiredBlock.toString());
    } catch (e) {
      throw new Error(`Error | getExecutedBlockEventsForCrosschain | ${e}`);
    }
  }
  public async getBlockEvents(blockNumber: string): Promise<any> {
    try {
      const tmRpc = getEndpointsForNetwork(this.chainEnvironment).tmEndpoint;
      const blockData = await restFetcher(
        `${tmRpc}/block_results?height=${blockNumber}`
      );
      const decoded_end_block_events = blockData.result.end_block_events.map(
        (eventData: any) => {
          eventData.attributes = eventData.attributes.map((attribute: any) => {
            try {
              attribute.key = fromBase64ToString(attribute.key);
              attribute.value = fromBase64ToString(attribute.value);
            } catch (e) {
              console.log(
                'problematic attribute =>',
                JSON.stringify(attribute)
              );
            }
            return attribute;
          });
          return eventData;
        }
      );
      const decoded_begin_block_events = blockData.result.begin_block_events.map(
        (eventData: any) => {
          eventData.attributes = eventData.attributes.map((attribute: any) => {
            try {
              attribute.key = fromBase64ToString(attribute.key);
              attribute.value = fromBase64ToString(attribute.value);
            } catch (e) {
              console.log(
                'problematic attribute =>',
                JSON.stringify(attribute)
              );
            }
            return attribute;
          });
          return eventData;
        }
      );
      const decoded_txs_results_events = blockData.result.txs_results.map(
        (txn: any) => {
          return txn.events.map((eventData: any) => {
            eventData.attributes = eventData.attributes.map(
              (attribute: any) => {
                try {
                  attribute.key = fromBase64ToString(attribute.key);
                  attribute.value = fromBase64ToString(attribute.value);
                } catch (e) {
                  console.log(
                    'problematic attribute =>',
                    JSON.stringify(attribute)
                  );
                }
                return attribute;
              }
            );
            return eventData;
          });
        }
      );
      const result = {
        end_block_events: decoded_end_block_events,
        begin_block_events: decoded_begin_block_events,
        txs_results: decoded_txs_results_events,
      };
      return result;
    } catch (e) {
      throw new Error(`Error | getExecutedBlockEventsForCrosschain | ${e}`);
    }
  }
}
