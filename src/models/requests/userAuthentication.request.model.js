import B21RequestModel from '../b21.request.model';

class UserAuthenticationRequestModel extends B21RequestModel {
  Username: string;
  Password: string;

  constructor(Username: string, Password: string) {
    super();
    this.Username = Username;
    this.Password = Password;
  }
}

export { UserAuthenticationRequestModel };
