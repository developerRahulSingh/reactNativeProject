import B21RequestModel from '../b21.request.model';

class GetCountriesRequestModel extends B21RequestModel {
  RetrieveSignupSupportedOnlyCountries: boolean;

  constructor(RetrieveSignupSupportedOnlyCountries: boolean = true, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.RetrieveSignupSupportedOnlyCountries = RetrieveSignupSupportedOnlyCountries;
  }
}

export { GetCountriesRequestModel };
