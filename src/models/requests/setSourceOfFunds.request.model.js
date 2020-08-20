import B21RequestModel from '../b21.request.model';

class SetSourceOfFundsRequestModel extends B21RequestModel {
  SourceOfFunds: string;

  constructor(SourceOfFunds: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.SourceOfFunds = SourceOfFunds;
  }
}

export { SetSourceOfFundsRequestModel };
