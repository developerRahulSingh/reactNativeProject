import B21RequestModel from '../b21.request.model';
import { PhoneEntity } from '../entities';

class AddUpdatePhoneRequestModel extends B21RequestModel {
  Phone: PhoneEntity;
  VerificationCode: string;

  constructor(VerificationCode: string, Phone: PhoneEntity, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Phone = Phone;
    this.VerificationCode = VerificationCode;
  }
}

export { AddUpdatePhoneRequestModel };
