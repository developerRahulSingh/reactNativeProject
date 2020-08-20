import B21RequestModel from '../b21.request.model';

class GetSupportedPaymentInstrumentTypesRequestModel extends B21RequestModel {
  Direction: string;

  constructor(Direction: string) {
    super();
    this.Direction = Direction;
  }
}

export { GetSupportedPaymentInstrumentTypesRequestModel };
