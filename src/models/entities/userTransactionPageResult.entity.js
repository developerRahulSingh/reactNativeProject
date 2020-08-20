import { UserTransactionHistoryItemsEntity } from './userTransactionHistoryItems.entity';

class UserTransactionPageResultEntity {
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  TotalRows: number;
  Rows: Array<UserTransactionHistoryItemsEntity>;
}

export { UserTransactionPageResultEntity };
