class UserSignupRegistrationInfoEntity {
  AggregateKYCPassed: boolean;
  ChangeAddressRequestVerificationStatus: string;
  EmailVerified: boolean;
  GoalAllocationCreated: boolean;
  KYCEVerificationFailed: boolean;
  KYCPassed: boolean;
  KYCPassportUploaded: boolean;
  KYCPassportVerificationStatus: string;
  KYCStatus: string;
  KYCTransakStatus: string | 'P' | 'F' | 'M' | 'N';
  KYCType: string;
  KYCTypeDisplayName: string;
  KYCUtilityBillUploaded: boolean;
  KYCUtilityBillVerificationStatus: string;
  MobilePhoneVerified: boolean;
  PhoneCountryCodeEVerifySupported: string;
  PhoneCountryCodeSignupSupported: string;
  RegistrationSubmitted: boolean
  SourceOfFunds: string;
  TermsAndConditionsAccepted: boolean;
  UpdateEmailVerified: boolean;
  ValidAddress: boolean;
}

export { UserSignupRegistrationInfoEntity };
