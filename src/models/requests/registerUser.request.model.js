import B21RequestModel from '../b21.request.model';
import { DataFieldEntity } from '../entities/dataField.entity';

class RegisterUserRequestModel extends B21RequestModel {
  UserID: number;
  GovernmentIDType: string;
  GovernmentIDNumber: string;
  Consent: boolean;
  DataFields: Array<DataFieldEntity>;
  NationalIDs: Array<DataFieldEntity>;
  Consents: Array<string>;
  PassportImage: string;
  UtilityBillImage: string;

  constructor(UserID: number, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.UserID = UserID;
  }
}

export { RegisterUserRequestModel };
