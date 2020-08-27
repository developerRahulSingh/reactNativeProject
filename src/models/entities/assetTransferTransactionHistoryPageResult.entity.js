import { AssetTransferTransactionHistoryItemEntity } from './assetTransferTransactionHistoryItem.entity';

class AssetTransferTransactionHistoryPageResultEntity {
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  TotalRows: number;
  Rows: Array<AssetTransferTransactionHistoryItemEntity>;
}

export { AssetTransferTransactionHistoryPageResultEntity };
