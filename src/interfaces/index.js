import moment from 'moment';
import { strings } from '../config/i18/i18n';
import goalAllocationType from '../constants/goal.allocation.type.enum';
import addUserProfileImageRequestModal from '../models/addUserProfileImage.request.modal';
import B21RequestModel from '../models/b21.request.model';
import { AddressBO, CountriesBO, CountryStatesBO, CurrencyBO, RegisterUserFieldRequirementsBO, SourceOfFundsBO, UserBO, UserInfoBO } from '../models/businessObjects';
import {
  AddressEntity,
  AssetTransferWalletAddressEntity,
  AuthenticationTokenEntity,
  BuyAssetsInfoEntity,
  CreatePaymentInstrumentEntity,
  DepositInfoEntity,
  GenerateCreatePaymentInstrumentHTMLEntity,
  GoalAllocationEntity,
  GoalAllocationItemEntity,
  GoalDashboardEntity,
  GoalEntity,
  NameValuePairEntity,
  OptInItemResultEntity,
  PaymentInstrumentRequirementsEntity,
  PaymentInstrumentsEntity,
  PhoneEntity,
  PhoneResponseEntity,
  ProofOfIdentityTypesEntity,
  SellAssetsInfoEntity,
  SupportedPaymentInstrumentTypesEntity,
  TermsAndConditionsEntity,
  UpdatePersonEntity,
  UserProfilePictureEntity,
  UserSignupRegistrationInfoEntity,
  UserTransactionEntity,
  WithdrawEntity,
  WithdrawInfoEntity,
} from '../models/entities';
import { DataFieldEntity } from '../models/entities/dataField.entity';
import GetUserPaymentInstrumentsRequestModel from '../models/get.user.payment.instruments.request.model';
import {
  AddUpdatePhoneRequestModel,
  BuyAssetsRequestModel,
  CancelDepositRequestModel,
  CheckAvailableEmailRequestModel,
  CreateGoalAllocationRequestModel,
  CreatePaymentInstrumentRequestModel,
  CreateUserRequestModel,
  DepositAmountRequestModel,
  ForgotPasswordRequestModel,
  GenerateCreatePaymentInstrumentHTMLRequestModel,
  GetAssetTransferWalletAddressRequestModel,
  GetCountriesRequestModel,
  GetCurrenciesRequestModel,
  GetGoalAllocationRequestModel,
  GetPaymentInstrumentRequirementsRequestModel,
  GetSupportedPaymentInstrumentTypesRequestModel,
  GetUserTaxReportingStatementDocumentRequestModel,
  GetUserTransactionHistoryRequestModel,
  MarkDepositAsInitiatedPaymentRequestModel,
  RegisterUserByDocumentRequestModel,
  RegisterUserRequestModel,
  ResetPasswordRequestModel,
  SellAssetsRequestModel,
  SendMobileVerificationCodeRequestModel,
  UpdateAddressRequestModel,
  UpdateEmailAddressRequestModel,
  UpdateGoalAllocationRequestModel,
  UpdateOptInItemRequestModel,
  UpdatePersonRequestModel,
  UserAuthenticationRequestModel,
  WithdrawAmountRequestModel,
} from '../models/requests';
import { AddAddressRequestModel } from '../models/requests/addAddress.request.model';
import { CreateGoalRequestModel } from '../models/requests/createGoal.request.model';
import { GetCountryStatesRequestModel } from '../models/requests/getCountryStates.request.model';
import { GetRegisterUserFieldRequirementsRequestModel } from '../models/requests/getRegisterUserFieldRequirements.request.model';
import { SetSourceOfFundsRequestModel } from '../models/requests/setSourceOfFunds.request.model';
import {
  AcceptTermsAndConditionsResponseModel,
  AddAddressResponseModel,
  AddUpdatePhoneResponseModel,
  AuthAndGetUserInfoResponseModel,
  CreateGoalAllocationResponseModel,
  CreateGoalResponseModel,
  CreatePaymentInstrumentResponseModel,
  CreateUserResponseModel,
  DepositAmountResponseModel,
  GenerateCreatePaymentInstrumentHTMLResponseModel,
  GetAssetTransferWalletAddressResponseModel,
  GetCountriesResponseModel,
  GetCountryStatesResponseModel,
  GetCurrenciesResponseModel,
  GetGoalAllocationResponseModel,
  GetGoalDashboardResponseModel,
  GetPaymentInstrumentRequirementsResponseModel,
  GetProfilePictureResponseModel,
  GetProofOfIdentityTypesResponseModel,
  GetRegisterUserFieldRequirementsResponseModel,
  GetSourceOfFundsResponseModel,
  GetSupportedPaymentInstrumentTypesResponseModel,
  GetUserInfoResponseModel,
  GetUserPaymentInstrumentsResponseModel,
  GetUserTransactionHistoryResponseModel,
  RegisterUserResponseModel,
  SetSourceOfFundsResponseModel,
  TermsAndConditionsUserResponseModel,
  UpdateAddressResponseModel,
  UpdateGoalAllocationResponseModel,
  UpdateOptInItemResponseModel,
  UpdatePersonResponseModel,
  UserAuthenticationResponseModel,
  WithdrawAmountResponseModel,
} from '../models/responses';
import HttpResponseModel from '../models/responses/base/httpResponse.model';
import NavigationUtil from '../utils/navigation.util';
import AuthInterface from './endpoints/auth.interface';
import GoalInterface from './endpoints/goal.interface';
import KYCInterface from './endpoints/kyc.interface';
import PaymentInterface from './endpoints/payment.interface';
import ProfileInterface from './endpoints/profile.interface';
import ReportInterface from './endpoints/report.interface';
import TransactionInterface from './endpoints/transaction.interface';

const BuildConfig = require('react-native-build-config');

const interfaces = {
  //Api Use For   - get special user authentication token
  specialUserAuthenticationToken: async (): Promise<AuthenticationTokenEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let requestModel = new UserAuthenticationRequestModel(`${BuildConfig.default.SUserName}`, `${BuildConfig.default.SPassword}`);
      try {
        let response = new UserAuthenticationResponseModel(await AuthInterface.authenticateSpecialUser(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  login
  userLogin: async (username: string, password: string): Promise<UserBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new UserAuthenticationRequestModel(username, password);
        let response = new AuthAndGetUserInfoResponseModel(await AuthInterface.authAndGetUserInfo(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  login
  userLoginWithToken: async (token: string): Promise<UserBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel(token);
        let getUserInfoResponseModel = new GetUserInfoResponseModel(await AuthInterface.getUserInfo(requestModel));
        if (getUserInfoResponseModel.isSuccessResponse()) {
          let goalDashboardResponseModel = new GetGoalDashboardResponseModel(await GoalInterface.getGoalDashboard(requestModel));
          if (goalDashboardResponseModel.isSuccessResponse()) {
            resolve({
              ...getUserInfoResponseModel.Result, AuthenticationToken: {
                Token: token,
              }, GoalDashboard: goalDashboardResponseModel.Result,
            });
          } else {
            return interfaces.handleAPIError(goalDashboardResponseModel, reject);
          }
        } else {
          return interfaces.handleAPIError(getUserInfoResponseModel, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get list of countries
  getCountries: async (): Promise<CountriesBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetCountriesRequestModel(false);
        let response = new GetCountriesResponseModel(await AuthInterface.getCountries(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  create new user
  createUser: async (user: CreateUserRequestModel, password: string, referralCode: string): Promise<UserBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel: CreateUserRequestModel = user;
        requestModel.Password = password;
        requestModel.ReferralCode = referralCode;
        let response = new CreateUserResponseModel(await AuthInterface.createUser(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get reset password verification code
  forgotPassword: async (email: string, superUserToken: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new ForgotPasswordRequestModel(email, superUserToken);
        let response = new HttpResponseModel(await ProfileInterface.forgotPassword(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  resetting new password
  resetPassword: async (email: string, password: string, verificationCode: string, superUserToken: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new ResetPasswordRequestModel(email, password, verificationCode, superUserToken);
        let response = new HttpResponseModel(await ProfileInterface.resetPassword(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  check email availability
  checkAvailableEmail: async (email: string, superUserToken: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel: CheckAvailableEmailRequestModel = new CheckAvailableEmailRequestModel(email, superUserToken);
        let response: HttpResponseModel = new HttpResponseModel(await AuthInterface.checkAvailableEmail(requestModel));
        if (response.isSuccessResponse() && !!response.Result) {
          resolve(true);
        } else if (response.isSuccessResponse() && !response.Result) {
          return NavigationUtil.showAlert({
            messageText: strings('common.alert_email_already_registered'),
            onRightButtonPress: () => {
              reject(false);
            },
          });
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get resend email verification link
  resendEmailVerification: async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new HttpResponseModel(await KYCInterface.resendEmailVerification(requestModel));
        if (response.isSuccessResponse() && !!response.Result) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get logged in user information
  getUserInfo: async (): Promise<UserInfoBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new GetUserInfoResponseModel(await AuthInterface.getUserInfo(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   -  update email
  updateEmail: async (email: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new UpdateEmailAddressRequestModel(email);
        let response: HttpResponseModel = new HttpResponseModel(await ProfileInterface.updateEmail(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get mobile verification code for verification
  sendMobileNumberVerificationCode: async (mobile: string, countryCode: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new SendMobileVerificationCodeRequestModel(mobile, countryCode);
        let response = new HttpResponseModel(await AuthInterface.sendMobileNumberVerificationCode(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - register mobile number
  addPhone: async (mobile: string, verificationCode: string): Promise<PhoneResponseEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let phone = new PhoneEntity();
        phone.PhoneNumber = mobile;
        phone.PhoneType = 'Mobile';
        let requestModel = new AddUpdatePhoneRequestModel(verificationCode, phone);
        let response = new AddUpdatePhoneResponseModel(await AuthInterface.addPhone(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get currency list
  getCurrencies: async (): Promise<CurrencyBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetCurrenciesRequestModel();
        let response = new GetCurrenciesResponseModel(await GoalInterface.getCurrencies(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get Terms and Condition
  getTermsAndCondition: async (): Promise<TermsAndConditionsEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new TermsAndConditionsUserResponseModel(await AuthInterface.getTermsAndConditions(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - Accept Terms and Condition
  acceptTermsAndConditions: async (): Promise<UserInfoBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new AcceptTermsAndConditionsResponseModel(await AuthInterface.acceptTermsAndConditions(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
//Api Use For   -  Create Goal
  createGoal: async (): Promise<GoalEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let goalData = new GoalEntity();
      goalData.GoalName = 'Goal';
      goalData.GoalAmount = 25000;
      goalData.GoalFiatCurrencyCode = 'USD';
      goalData.GoalDate = moment(new Date()).add(3, 'years').format('YYYY-MM-DD');
      let requestModel = new CreateGoalRequestModel(goalData);
      try {
        let response = new CreateGoalResponseModel(await GoalInterface.createGoal(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  // Api Use For   -  create goal allocation
  createGoalAllocation: async (goalID: string, goalAllocationItems: Array<GoalAllocationItemEntity>): Promise<GoalAllocationEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let newGoalAllocationData = new GoalAllocationEntity();
      newGoalAllocationData.GoalID = goalID;
      newGoalAllocationData.GoalAllocationType = goalAllocationType.InwardFund;
      newGoalAllocationData.GoalAllocationItems = goalAllocationItems;

      let requestModel = new CreateGoalAllocationRequestModel(newGoalAllocationData);
      try {
        let response = new CreateGoalAllocationResponseModel(await GoalInterface.createGoalAllocation(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get Selected Country States List
  getCountryStates: async (countryCode: string): Promise<CountryStatesBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetCountryStatesRequestModel(countryCode);
        let response = new GetCountryStatesResponseModel(await KYCInterface.getCountryStates(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
// Api Use For   - get register user fields
  getRegisterUserFieldRequirements: async (countryCode: string): Promise<RegisterUserFieldRequirementsBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetRegisterUserFieldRequirementsRequestModel(countryCode);
        let response = new GetRegisterUserFieldRequirementsResponseModel(await KYCInterface.getRegisterUserFieldRequirements(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - register user address
  addAddress: async (address: string, city: string, suburb: string, countryCode: string, stateCode: string, postalCode: string): Promise<AddressBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      let addressObject = new AddressEntity();
      addressObject.Address1 = address;
      addressObject.City = city;
      addressObject.Suburb = suburb;
      addressObject.CountryCode = countryCode;
      addressObject.StateCode = stateCode;
      addressObject.PostalCode = postalCode;
      addressObject.AddressType = 'Home';
      try {
        let requestModel = new AddAddressRequestModel(addressObject);
        let response = new AddAddressResponseModel(await KYCInterface.addAddress(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - register user address
  updateAddress: async (address: string, city: string, suburb: string, countryCode: string, stateCode: string, postalCode: string): Promise<AddressBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new UpdateAddressRequestModel(address, suburb, city, stateCode, postalCode, countryCode);
        let response = new UpdateAddressResponseModel(await KYCInterface.updateAddress(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - get list of source of funds
  getSourceOfFunds: async (): Promise<SourceOfFundsBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new GetSourceOfFundsResponseModel(await KYCInterface.getSourceOfFunds(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - update selected source of fund
  updateSourceOfFunds: async (selectSourceOfFund: string): Promise<UserSignupRegistrationInfoEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new SetSourceOfFundsRequestModel(selectSourceOfFund);
        let response = new SetSourceOfFundsResponseModel(await KYCInterface.updateSourceOfFunds(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For   - update user information
  updatePerson: async (firstName: string, lastName: string, middleName: string, secondLastName: string, fullName: string, dayOfBirth: string, monthOfBirth: string, yearOfBirth: string): Promise<UpdatePersonEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let requestModel = new UpdatePersonRequestModel();
      requestModel.FirstName = firstName;
      requestModel.LastName = lastName;
      requestModel.MiddleName = middleName;
      requestModel.SecondLastName = secondLastName;
      requestModel.FullName = fullName;
      requestModel.DayOfBirth = dayOfBirth;
      requestModel.MonthOfBirth = monthOfBirth;
      requestModel.YearOfBirth = yearOfBirth;
      try {
        let response = new UpdatePersonResponseModel(await KYCInterface.updatePerson(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          await NavigationUtil.showAlert({
            messageText: response.ErrorMsg,
            messageTextDebug: response.ErrorMsgDebug,
            onRightButtonPress: () => {
              reject(false);
            },
          });
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
//Api Use For  - register User if user country support e-verification
  registerUser: async (userID: number, consents: Array<string>, dataFields: Array<DataFieldEntity>, nationalIDs: Array<DataFieldEntity>, governmentIDNumber: string, governmentIDType: string, passportImage: string, utilityBillImage: string): Promise<UserInfoBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      let requestModel = new RegisterUserRequestModel(userID);
      requestModel.Consent = true;
      requestModel.Consents = consents;
      requestModel.DataFields = dataFields;
      requestModel.NationalIDs = nationalIDs;
      requestModel.GovernmentIDNumber = governmentIDNumber;
      requestModel.GovernmentIDType = governmentIDType;
      requestModel.PassportImage = passportImage;
      requestModel.UtilityBillImage = utilityBillImage;
      try {
        let response = new RegisterUserResponseModel(await KYCInterface.registerUser(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  // Api Use For  - register User if user country not support e-verification
  registerUserByDocument: async (governmentIDNumber: string, governmentIDType: string, passportImage: string, utilityBillImage: string): Promise<UserInfoBO | boolean> => {
    return new Promise(async (resolve, reject) => {
      let requestModel = new RegisterUserByDocumentRequestModel();
      requestModel.GovernmentIDType = governmentIDType;
      requestModel.GovernmentIDNumber = governmentIDNumber;
      requestModel.PassportImage = passportImage;
      requestModel.UtilityBillImage = utilityBillImage;
      try {
        let response = new RegisterUserResponseModel(await KYCInterface.registerUserByDocument(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  // Api Use For  - Get Dashboard Value
  getGoalDashboard: async (): Promise<GoalDashboardEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new GetGoalDashboardResponseModel(await GoalInterface.getGoalDashboard(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For  - get list of supported payment Instrument
  getSupportedPaymentInstrumentTypes: async (direction: string): Promise<SupportedPaymentInstrumentTypesEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let request = new GetSupportedPaymentInstrumentTypesRequestModel(direction);
        let response = new GetSupportedPaymentInstrumentTypesResponseModel(await PaymentInterface.getSupportedPaymentInstrumentTypes(request));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
// Api Use For  - get supported payment instrument required information
  getPaymentInstrumentRequirements: async (direction: string, piTypeName: string, tsTypeName: string): Promise<PaymentInstrumentRequirementsEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetPaymentInstrumentRequirementsRequestModel(direction, piTypeName, tsTypeName);
        let response = new GetPaymentInstrumentRequirementsResponseModel(await PaymentInterface.getPaymentInstrumentRequirements(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },

  //Api Use For  - Get user Payment instrument from API
  getUserPaymentInstruments: async (direction: string, piTypeName: string, tsTypeName: string): Promise<PaymentInstrumentsEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetUserPaymentInstrumentsRequestModel(direction, piTypeName, tsTypeName);
        let response = new GetUserPaymentInstrumentsResponseModel(await PaymentInterface.getUserPaymentInstruments(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
// Api Use For - adding card and bank transfer(ACH)
  generateCreatePaymentInstrumentHTML: async (direction: string, piTypeName: string, tsTypeName: string): Promise<GenerateCreatePaymentInstrumentHTMLEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GenerateCreatePaymentInstrumentHTMLRequestModel(direction, piTypeName, tsTypeName);
        let response = new GenerateCreatePaymentInstrumentHTMLResponseModel(await PaymentInterface.generateCreatePaymentInstrumentHTML(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - create new payment Instrument
  createUserPaymentInstruments: async (direction: string, piTypeName: string, tsTypeName: string, piName: string, piRequiredFieldValues: Array<NameValuePairEntity>): Promise<CreatePaymentInstrumentEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new CreatePaymentInstrumentRequestModel(direction, piTypeName, tsTypeName, piName, piRequiredFieldValues);
        let response = new CreatePaymentInstrumentResponseModel(await PaymentInterface.createUserPaymentInstruments(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          await NavigationUtil.showAlert({
            messageText: response.ErrorMsg,
            messageTextDebug: response.ErrorMsgDebug,
            onRightButtonPress: () => {
              reject(false);
            },
          });
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - get Profile Image
  getUserProfileImage: async (): Promise<UserProfilePictureEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        // requestModel.ProcessInBackground = true;
        let response = new GetProfilePictureResponseModel(await ProfileInterface.getUserProfileImage(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - add user profile image
  addUserProfileImage: async (userImage: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new addUserProfileImageRequestModal(userImage);
        let response = new HttpResponseModel(await ProfileInterface.addUserProfileImage(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - update Mobile Number
  updatePhoneNumber: async (mobileNumber: string, verificationCode: string): Promise<PhoneResponseEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let phone = new PhoneEntity();
      phone.PhoneNumber = mobileNumber;
      phone.PhoneType = 'Mobile';
      let requestModel = new AddUpdatePhoneRequestModel(verificationCode, phone);
      try {
        let response = new AddUpdatePhoneResponseModel(await ProfileInterface.updatePhoneNumber(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - update assets allocation
  updateGoalAllocation: async (goalAllocationID: string, goalAllocationItems: Array<GoalAllocationItemEntity>): Promise<GoalAllocationEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      let goalAllocationData = new GoalAllocationEntity();
      goalAllocationData.GoalAllocationID = goalAllocationID;
      goalAllocationData.GoalAllocationItems = goalAllocationItems;
      try {
        let requestModel = new UpdateGoalAllocationRequestModel(goalAllocationData);
        let response = new UpdateGoalAllocationResponseModel(await GoalInterface.updateGoalAllocation(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - get list of transactions
  getUserTransactionHistory: async (pageNumber: number, pageSize: number): Promise<UserTransactionEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetUserTransactionHistoryRequestModel('All', '', '', pageNumber, pageSize);
        let response = new GetUserTransactionHistoryResponseModel(await TransactionInterface.getUserTransactionHistory(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - send tax report vai mail
  getUserTaxReportingStatementDocument: (year: string, reportFormat: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetUserTaxReportingStatementDocumentRequestModel();
        requestModel.Year = year;
        requestModel.ReportFormat = reportFormat;
        let response = new HttpResponseModel(await ReportInterface.getUserTaxReportingStatementDocument(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - get assets allocation information
  getGoalAllocation: (): Promise<GoalAllocationEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetGoalAllocationRequestModel();
        let response = new GetGoalAllocationResponseModel(await GoalInterface.getGoalAllocation(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
          // return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - buy assets
  buyAssets: (buyAssetsInfo: BuyAssetsInfoEntity): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new BuyAssetsRequestModel(buyAssetsInfo);
        let response = new HttpResponseModel(await TransactionInterface.buyAssets(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - deposit into portfolio and cash balance
  deposit: (depositInfo: DepositInfoEntity, buyAssetsInfo: BuyAssetsInfoEntity): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new DepositAmountRequestModel(depositInfo, buyAssetsInfo);
        let response = new DepositAmountResponseModel(await PaymentInterface.deposit(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - cancelling the transak deposit
  cancelDeposit: (depositTransactionID: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new CancelDepositRequestModel(depositTransactionID);
        let response = new HttpResponseModel(await PaymentInterface.cancelDeposit(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - cancelling the transak deposit
  markDepositAsInitiatedPayment: (depositTransactionID: string): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new MarkDepositAsInitiatedPaymentRequestModel(depositTransactionID);
        let response = new HttpResponseModel(await PaymentInterface.markDepositAsInitiatedPayment(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - sell Assets
  sellAssets: (sellAssetsInfo: SellAssetsInfoEntity): Promise<any | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new SellAssetsRequestModel(sellAssetsInfo);
        let response = new HttpResponseModel(await TransactionInterface.sellAssets(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For -withdraw amount from portfolio
  withdraw: (withdrawInfo: WithdrawInfoEntity): Promise<WithdrawEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new WithdrawAmountRequestModel(withdrawInfo);
        let response = new WithdrawAmountResponseModel(await PaymentInterface.withdraw(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  UpdateOptInItem: (OptInTypeName: string, OptInDate: string): Promise<OptInItemResultEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new UpdateOptInItemRequestModel(OptInTypeName, OptInDate);
        let response = new UpdateOptInItemResponseModel(await KYCInterface.updateOptInItem(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          reject(response);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - get list of proof of identity
  GetProofOfIdentityTypes: (): Promise<ProofOfIdentityTypesEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new B21RequestModel();
        let response = new GetProofOfIdentityTypesResponseModel(await KYCInterface.getProofOfIdentityTypes(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  //Api Use For - get crypto currency wallet address to transfer assets into based on the specified currency code
  GetAssetTransferWalletAddress: (Direction: string, CurrencyCode: string): Promise<AssetTransferWalletAddressEntity | boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let requestModel = new GetAssetTransferWalletAddressRequestModel(Direction, CurrencyCode);
        let response = new GetAssetTransferWalletAddressResponseModel(await TransactionInterface.getAssetTransferWalletAddress(requestModel));
        if (response.isSuccessResponse()) {
          resolve(response.Result);
        } else {
          return interfaces.handleAPIError(response, reject);
        }
      } catch (error) {
        return interfaces.handleAPIException(error, reject);
      }
    });
  },
  handleAPIException: (error, reject) => {
    if (error) {
      return NavigationUtil.showAlert({
        messageText: strings('common.alert_api_failure'),
        onRightButtonPress: () => {
          reject(false);
        },
      });
    } else {
      reject(false);
    }
  },
  handleAPIError: (response, reject) => {
    let reasonObj = response.ReasonCodes?.find((reasonCode) => reasonCode.ReasonCode === '247');
    if (response.ErrorCode === '2' && !!reasonObj) {
      return NavigationUtil.showAlert({messageText: reasonObj.ReasonMsg});
    } else {
      return NavigationUtil.showAlert({
        messageText: response.ErrorMsg,
        messageTextDebug: response.ErrorMsgDebug,
        onRightButtonPress: () => {
          reject(false);
        },
        onMessageCopyButtonPress: () => {
          reject(false);
        },
      });
    }
  },
};

export default interfaces;
