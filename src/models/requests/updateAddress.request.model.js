import B21RequestModel from '../b21.request.model';

class UpdateAddressRequestModel extends B21RequestModel {
  AddressLine1: string;
  Suburb: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;

  constructor(AddressLine1: string, Suburb: string, City: string, State: string, ZipCode: string, Country: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);

    this.AddressLine1 = AddressLine1;
    this.Suburb = Suburb;
    this.City = City;
    this.State = State;
    this.ZipCode = ZipCode;
    this.Country = Country;
  }
}

export { UpdateAddressRequestModel };
