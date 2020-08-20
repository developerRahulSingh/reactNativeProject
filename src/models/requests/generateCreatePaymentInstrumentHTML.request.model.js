import B21RequestModel from '../b21.request.model';

class GenerateCreatePaymentInstrumentHTMLRequestModel extends B21RequestModel {
  Direction: string;
  PITypeName: string;
  TSTypeName: string;

  constructor(Direction: string, PITypeName: string, TSTypeName: string) {
    super();
    this.Direction = Direction;
    this.PITypeName = PITypeName;
    this.TSTypeName = TSTypeName;
  }
}

export { GenerateCreatePaymentInstrumentHTMLRequestModel };
