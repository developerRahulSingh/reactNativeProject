import B21RequestModel from '../b21.request.model';
import { NameValuePairEntity } from '../entities';

class CreatePaymentInstrumentRequestModel extends B21RequestModel {
  Direction: string;
  PITypeName: string;
  TSTypeName: string;
  PIName: string;
  PIRequiredFieldValues: Array<NameValuePairEntity>;

  constructor(Direction: string, PITypeName: string, TSTypeName: string, PIName: string, PIRequiredFieldValues: Array<NameValuePairEntity>) {
    super();
    this.Direction = Direction;
    this.PITypeName = PITypeName;
    this.TSTypeName = TSTypeName;
    this.PIName = PIName;
    this.PIRequiredFieldValues = PIRequiredFieldValues;
  }
}

export { CreatePaymentInstrumentRequestModel };
