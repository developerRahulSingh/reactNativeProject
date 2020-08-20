import B21RequestModel from '../b21.request.model';

class UpdatePersonRequestModel extends B21RequestModel {
  FirstName: string;
  LastName: string;
  SecondLastName: string;
  FullName: string;
  MiddleName: string;
  DayOfBirth: string;
  MonthOfBirth: string;
  YearOfBirth: string;

  constructor(AuthenticationToken: string = null) {
    super(AuthenticationToken);
  }
}

export { UpdatePersonRequestModel };
