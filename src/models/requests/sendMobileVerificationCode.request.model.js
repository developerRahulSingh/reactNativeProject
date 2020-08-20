import B21RequestModel from '../b21.request.model';

class SendMobileVerificationCodeRequestModel extends B21RequestModel {
  CountryCode: string;
  MobilePhone: string;

  constructor(MobilePhone: string, CountryCode: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.MobilePhone = MobilePhone;
    this.CountryCode = CountryCode;
  }
}

export { SendMobileVerificationCodeRequestModel };
