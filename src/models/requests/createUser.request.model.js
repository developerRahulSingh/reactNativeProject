import B21RequestModel from '../b21.request.model';

class CreateUserRequestModel extends B21RequestModel {
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  ReferralCode: string;
  Password: string;

  constructor(firstName: string, lastName: string, email: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);

    this.EmailAddress = email;
    this.FirstName = firstName;
    this.LastName = lastName;
  }
}

export { CreateUserRequestModel };
