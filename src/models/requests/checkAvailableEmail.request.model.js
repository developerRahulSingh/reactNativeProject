import B21RequestModel from '../b21.request.model';

class CheckAvailableEmailRequestModel extends B21RequestModel {
  Email: string;

  constructor(Email: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Email = Email;
  }
}

export { CheckAvailableEmailRequestModel };
