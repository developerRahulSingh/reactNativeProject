import B21RequestModel from '../b21.request.model';

class ForgotPasswordRequestModel extends B21RequestModel {
  Username: string;

  constructor(Username: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Username = Username;
  }
}

export { ForgotPasswordRequestModel };
