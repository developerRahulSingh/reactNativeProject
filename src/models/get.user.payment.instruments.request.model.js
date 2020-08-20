import B21RequestModel from './b21.request.model';

export default class GetUserPaymentInstrumentsRequestModel extends B21RequestModel {
  Direction: string;
  PITypeName: string;
  TSTypeName: string;
  IncludeMarkedDeletedItems: boolean;

  constructor(Direction: string, PITypeName: string, TSTypeName: string, IncludeMarkedDeletedItems: boolean = false, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Direction = Direction;
    this.PITypeName = PITypeName;
    this.TSTypeName = TSTypeName;
    this.IncludeMarkedDeletedItems = IncludeMarkedDeletedItems;
  }

}
