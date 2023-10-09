const MsgUnjail = '/cosmos.slashing.v1beta1.MsgUnjail';
const MsgExec = '/cosmos.authz.v1beta1.MsgExec';
const MsgUpdateAdmin = '/cosmwasm.wasm.v1.MsgUpdateAdmin';
const MsgStoreCode = '/cosmwasm.wasm.v1.MsgStoreCode';
const MsgMigrateContract = '/cosmwasm.wasm.v1.MsgMigrateContract';
const MsgExecuteContract = '/cosmwasm.wasm.v1.MsgExecuteContract';
const MsgGrant = '/cosmos.authz.v1beta1.MsgGrant';
const MsgRevoke = '/cosmos.authz.v1beta1.MsgRevoke';
const MsgSend = '/cosmos.authz.v1beta1.MsgSend';
const MsgWithdrawDelegatorReward =
  '/cosmos.authz.v1beta1.MsgWithdrawDelegatorReward';
const MsgWithdrawValidatorCommission =
  '/cosmos.authz.v1beta1.MsgWithdrawValidatorCommission';
const MsgDeposit = '/cosmos.authz.v1beta1.MsgDeposit';
const MsgSubmitProposal = '/cosmos.authz.v1beta1.MsgSubmitProposal';
const MsgVote = '/cosmos.authz.v1beta1.MsgVote';
const MsgDelegate = '/cosmos.authz.v1beta1.MsgDelegate';
const MsgEditValidator = '/cosmos.authz.v1beta1.MsgEditValidator';
const MsgUndelegate = '/cosmos.authz.v1beta1.MsgUndelegate';
const MsgApproveFeepayerRequest =
  '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest';
const MsgCreateMetadataRequest =
  '/routerprotocol.routerchain.metastore.MsgCreateMetadataRequest';
const MsgCwStoreCode = '/routerprotocol.routerchain.rwasm.MsgCwStoreCode';
const MsgExecuteCwContract =
  '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract';
const MsgInstantiateCwContract =
  '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract';
const MsgMigrateCwContract =
  '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract';
const MsgSetOrchestratorAddress =
  '/routerprotocol.routerchain.attestation.MsgSetOrchestratorAddress';
const MsgValsetUpdatedClaim =
  '/routerprotocol.routerchain.attestation.MsgValsetUpdatedClaim';
const MsgValsetConfirm =
  '/routerprotocol.routerchain.attestation.MsgValsetConfirm';
const MsgConfirmCrosschainAckRequest =
  '/routerprotocol.routerchain.crosschain.MsgConfirmCrosschainAckRequest';
const MsgCrosschainAckRequest =
  '/routerprotocol.routerchain.crosschain.MsgCrosschainAckRequest';
const MsgCrosschainRequest =
  '/routerprotocol.routerchain.crosschain.MsgCrosschainRequest';
const MsgCrosschainAckReceipt =
  '/routerprotocol.routerchain.crosschain.MsgCrosschainAckReceipt';
const MsgConfirmCrosschainRequest =
  '/routerprotocol.routerchain.crosschain.MsgConfirmCrosschainRequest';
const MsgIncrementCrosstalkAckGas =
  '/routerprotocol.routerchain.crosstalk.MsgIncrementCrosstalkAckGas';
const MsgCrossTalkRequest =
  '/routerprotocol.routerchain.crosstalk.MsgCrossTalkRequest';
const MsgIncrementCrosstalkDestGas =
  '/routerprotocol.routerchain.crosstalk.MsgIncrementCrosstalkDestGas';
const MsgCrossTalkAckReceipt =
  '/routerprotocol.routerchain.crosstalk.MsgCrossTalkAckReceipt';
const MsgCrossTalkAckRequest =
  '/routerprotocol.routerchain.crosstalk.MsgCrossTalkAckRequest';
const MsgSetCrosstalkFeePayer =
  '/routerprotocol.routerchain.crosstalk.MsgSetCrosstalkFeePayer';
const MsgInboundRequest =
  '/routerprotocol.routerchain.inbound.MsgInboundRequest';
const MsgOutgoingBatchConfirm =
  '/routerprotocol.routerchain.outbound.MsgOutgoingBatchConfirm';
const MsgOutboundAckRequest =
  '/routerprotocol.routerchain.outbound.MsgOutboundAckRequest';
const MsgOutboundBatchRequest =
  '/routerprotocol.routerchain.outbound.MsgOutboundBatchRequest';
const MsgTokenPrices = '/routerprotocol.routerchain.pricefeed.MsgTokenPrices';
const MsgFundsPaid = '/routerprotocol.routerchain.voyager.MsgFundsPaid';
const MsgGasPrices = '/routerprotocol.routerchain.voyager.MsgFundsDeposited';

const ActionTxType = {
  [MsgGrant.toLowerCase()]: 'Grant',
  [MsgUnjail.toLowerCase()]: 'Unjail',
  [MsgExec.toLowerCase()]: 'Exec',
  [MsgRevoke.toLowerCase()]: 'Revoke',
  [MsgSend.toLowerCase()]: 'Send Coins',
  [MsgWithdrawDelegatorReward.toLowerCase()]: 'Claim Reward',
  [MsgWithdrawValidatorCommission.toLowerCase()]: 'Withdraw Commission',
  [MsgDeposit.toLowerCase()]: 'Deposit',
  [MsgSubmitProposal.toLowerCase()]: 'Submit Proposal',
  [MsgVote.toLowerCase()]: 'Vote',
  [MsgDelegate.toLowerCase()]: 'Delegate',
  [MsgEditValidator.toLowerCase()]: 'Edit Validator',
  [MsgUndelegate.toLowerCase()]: 'Undelegate',
  [MsgApproveFeepayerRequest.toLowerCase()]: 'Approve Fee Payer',
  [MsgCreateMetadataRequest.toLowerCase()]: 'Create Metadata Request',
  [MsgCwStoreCode.toLowerCase()]: 'Store Code',
  [MsgUpdateAdmin.toLowerCase()]: 'Update Admin',
  [MsgStoreCode.toLowerCase()]: 'Store Code',
  [MsgMigrateContract.toLowerCase()]: 'Migrate Contract',
  [MsgExecuteContract.toLowerCase()]: 'Execute',
  [MsgExecuteCwContract.toLowerCase()]: 'Execute',
  [MsgInstantiateCwContract.toLowerCase()]: 'Instantiate',
  [MsgMigrateCwContract.toLowerCase()]: 'Migrate',
  [MsgSetOrchestratorAddress.toLowerCase()]: 'Set Orchestrator Address',
  [MsgValsetUpdatedClaim.toLowerCase()]: 'Valset Updated Claim',
  [MsgValsetConfirm.toLowerCase()]: 'Valset Confirm',
  [MsgConfirmCrosschainAckRequest.toLowerCase()]: 'Confirm Crossschain Ack Request',
  [MsgCrosschainAckRequest.toLowerCase()]: 'Crosschain Ack Request',
  [MsgCrosschainRequest.toLowerCase()]: 'Crosschain Request',
  [MsgCrosschainAckReceipt.toLowerCase()]: 'Crosschain Ack Receipt',
  [MsgConfirmCrosschainRequest.toLowerCase()]: 'Confirm Crosschain Request',
  [MsgIncrementCrosstalkAckGas.toLowerCase()]: 'Increment Crosstalk Ack Gas',
  [MsgCrossTalkRequest.toLowerCase()]: 'CrossTalk Request',
  [MsgIncrementCrosstalkDestGas.toLowerCase()]: 'Increment Crosstalk DestGas',
  [MsgCrossTalkAckReceipt.toLowerCase()]: 'CrossTalk Ack Receipt',
  [MsgCrossTalkAckRequest.toLowerCase()]: 'CrossTalk Ack Request',
  [MsgSetCrosstalkFeePayer.toLowerCase()]: 'Set Crosstalk FeePayer',
  [MsgInboundRequest.toLowerCase()]: 'Inbound Request',
  [MsgOutgoingBatchConfirm.toLowerCase()]: 'Outgoing Batch Confirm',
  [MsgOutboundAckRequest.toLowerCase()]: 'Outbound Ack Request',
  [MsgOutboundBatchRequest.toLowerCase()]: 'Outbound Batch Request',
  [MsgTokenPrices.toLowerCase()]: 'Token Prices',
  [MsgFundsPaid.toLowerCase()]: 'Funds Paid',
  [MsgGasPrices.toLowerCase()]: 'Gas Prices',
};

interface RawLog {
  msg_index: number;
  events: Events[];
}

interface Events {
  type: string;
  attributes: Attributes[];
}

interface Attributes {
  key: string;
  value: string;
}

export const getTransactionTypes = (rawLog: RawLog[]) => {
  const txTypes: string[] = [];
  rawLog[0].events.forEach(eventLog => {
    if (eventLog.type === 'message') {
      eventLog.attributes.forEach(attribute => {
        if (attribute.key === 'action') {
          try {
            const txType = ActionTxType[attribute.value.toLowerCase()];
            if (txType) {
              txTypes.push(txType);
            }
          } catch (e) {
            console.log('getTransactionTypes error =>', e);
          }
        }
      });
    }
  });
  return txTypes;
};
