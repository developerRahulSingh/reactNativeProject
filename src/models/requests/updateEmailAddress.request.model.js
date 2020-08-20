import B21RequestModel from '../b21.request.model';

class UpdateEmailAddressRequestModel extends B21RequestModel {
  NewEmailAddress: string;

  constructor(NewEmailAddress: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.NewEmailAddress = NewEmailAddress;
  }
}

export { UpdateEmailAddressRequestModel };
