import B21RequestModel from '../b21.request.model';
import { AddressEntity } from '../entities/address.entity';

class AddAddressRequestModel extends B21RequestModel {
  Address: AddressEntity;

  constructor(Address: AddressEntity, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Address = Address;
  }
}

export { AddAddressRequestModel };
