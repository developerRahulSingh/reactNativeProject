import B21RequestModel from '../b21.request.model';

class GetUserTransactionHistoryRequestModel extends B21RequestModel {
  TransactionTypeFilter: string;
  StartDate: string;
  EndDate: string;
  PageNumber: Number;
  PageSize: Number;

  constructor(TransactionTypeFilter: string, StartDate: string, EndDate: string, PageNumber: Number, PageSize: Number) {
    super();
    this.TransactionTypeFilter = TransactionTypeFilter;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.PageNumber = PageNumber;
    this.PageSize = PageSize;
  }
}

export { GetUserTransactionHistoryRequestModel };
