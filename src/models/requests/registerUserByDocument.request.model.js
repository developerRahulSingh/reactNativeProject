import B21RequestModel from '../b21.request.model';

class RegisterUserByDocumentRequestModel extends B21RequestModel {
  GovernmentIDType: string;
  GovernmentIDNumber: string;
  PassportImage: string;
  UtilityBillImage: string;

  constructor(AuthenticationToken: string = null) {
    super(AuthenticationToken);
  }
}

export { RegisterUserByDocumentRequestModel };
