import B21RequestModel from '../b21.request.model';

class GetPaymentInstrumentRequirementsRequestModel extends B21RequestModel {
  Direction: string;
  PITypeName: string;
  TSTypeName: string;
  PIID: string;
  ServiceProviderName: string;

  constructor(Direction: string, PITypeName: string, TSTypeName: string, PIID: string = undefined, ServiceProviderName: string = undefined) {
    super();
    this.Direction = Direction;
    this.PITypeName = PITypeName;
    this.TSTypeName = TSTypeName;
    this.PIID = PIID;
    this.ServiceProviderName = ServiceProviderName;
  }
}

export { GetPaymentInstrumentRequirementsRequestModel };
