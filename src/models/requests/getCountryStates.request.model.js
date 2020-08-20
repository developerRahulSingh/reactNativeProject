import B21RequestModel from '../b21.request.model';

class GetCountryStatesRequestModel extends B21RequestModel {
  CountryCode: string;

  constructor(CountryCode: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.CountryCode = CountryCode;
  }
}

export { GetCountryStatesRequestModel };
