import B21RequestModel from '../b21.request.model';

class ResetPasswordRequestModel extends B21RequestModel {
  Username: string;
  NewPassword: string;
  VerificationCode: string;

  constructor(Username: string, NewPassword: string, VerificationCode: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Username = Username;
    this.NewPassword = NewPassword;
    this.VerificationCode = VerificationCode;
  }
}

export { ResetPasswordRequestModel };
