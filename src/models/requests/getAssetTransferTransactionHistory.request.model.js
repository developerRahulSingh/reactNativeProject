import B21RequestModel from '../b21.request.model';

class GetAssetTransferTransactionHistoryRequestModel extends B21RequestModel {
  CurrencyCodeFilter: string;
  StartDate: string;
  EndDate: string;
  PageNumber: number;
  PageSize: number;

  constructor(CurrencyCodeFilter: string, StartDate: string, EndDate: string, PageNumber: number, PageSize: number) {
    super();
    this.CurrencyCodeFilter = CurrencyCodeFilter;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.PageNumber = PageNumber;
    this.PageSize = PageSize;
  }
}

export { GetAssetTransferTransactionHistoryRequestModel };
