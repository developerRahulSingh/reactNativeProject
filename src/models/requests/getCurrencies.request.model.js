import B21RequestModel from '../b21.request.model';

class GetCurrenciesRequestModel extends B21RequestModel {
  CurrencyCategory: string;

  constructor(CurrencyCategory: string = '', AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.CurrencyCategory = CurrencyCategory;
  }
}

export { GetCurrenciesRequestModel };
