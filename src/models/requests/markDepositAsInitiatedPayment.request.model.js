import B21RequestModel from '../b21.request.model';

class MarkDepositAsInitiatedPaymentRequestModel extends B21RequestModel {
  DepositTransactionID: string;

  constructor(DepositTransactionID: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.DepositTransactionID = DepositTransactionID;
  }
}


export { MarkDepositAsInitiatedPaymentRequestModel };
