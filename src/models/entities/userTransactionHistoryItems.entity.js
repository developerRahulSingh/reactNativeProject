import { UserAssetsTradeEntity } from './userAssetsTrade.entity';

class UserTransactionHistoryItemsEntity {
  TransactionType: string;
  TransactionTypeDisplayName: string;
  Description: string;
  DepositTransactionID: string;
  Pending: boolean;
  Failed: boolean;
  GoalCurrencyCode: string;
  GoalCurrencyInitialAmount: number;
  GoalCurrencyFinalAmount: number;
  GoalCurrencyFeeAmount: number;
  B21CFeeAmount: number;
  CreatedDate: string;
  CanceledReason: string;
  AssociatedPIName: string;
  AssociatedPITypeName: string;
  AssociatedPITypeDisplayName: string;
  AssociatedTSTypeName: string;
  AssociatedTSTypeDisplayName: string;
  AssetTrades: Array<UserAssetsTradeEntity>;
}

export { UserTransactionHistoryItemsEntity };
