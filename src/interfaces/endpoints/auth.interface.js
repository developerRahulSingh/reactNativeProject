import HttpUrlConstant from '../../constants/http.constant';
import B21RequestModel from '../../models/b21.request.model';
import { UserAuthenticationRequestModel } from '../../models/requests';
import { AuthAndGetUserInfoResponseModel, GetUserInfoResponseModel } from '../../models/responses';
import { ClientInstance } from './baseClient';

export default class AuthInterface {

  static authenticateSpecialUser(specialUser) {
    return ClientInstance.post(HttpUrlConstant.AUTHENTICATE, specialUser)
      .then((response) => {
        return response.data;
      });
  }

  static checkAvailableEmail(emailData) {
    return ClientInstance.post(HttpUrlConstant.CHECK_AVAILABLE_EMAIL, emailData).then((response) => {
      return response.data;
    });
  }

  static createUser(userData) {
    return ClientInstance.post(HttpUrlConstant.CREATE_USER, userData).then((response) => {
      return response.data;
    });
  }

  static getCountries(countryData) {
    return ClientInstance.post(HttpUrlConstant.GET_COUNTRIES, countryData).then((response) => {
      return response.data;
    });
  }

  static sendMobileNumberVerificationCode(mobileData) {
    return ClientInstance.post(HttpUrlConstant.SEND_MOBILE_NUMBER_VERIFICATION_CODE, mobileData).then((response) => {
      return response.data;
    });
  }

  static getTermsAndConditions(userData) {
    return ClientInstance.post(HttpUrlConstant.GET_TERMS_AND_CONDITIONS, userData).then((response) => {
      return response.data;
    });
  }

  static acceptTermsAndConditions(userData) {
    return ClientInstance.post(HttpUrlConstant.ACCEPT_TERMS_AND_CONDITIONS, userData).then((response) => {
      return response.data;
    });
  }

  static getUserRegistrationModelImplementationQuestions(userData) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_REGISTRATION_MODEL_IMPLEMENTATION_QUESTIONS, userData).then((response) => {
      return response.data;
    });
  }

  static submitRegistrationModelImplementationQuestions(userData) {
    return ClientInstance.post(HttpUrlConstant.SubmitRegistrationModelImplementationQuestions, userData).then((response) => {
      return response.data;
    });
  }

  static addPhone(otpData) {
    return ClientInstance.post(HttpUrlConstant.ADD_PHONE, otpData).then((response) => {
      return response.data;
    });
  }

  static getUserInfo(userData: B21RequestModel): GetUserInfoResponseModel {
    return ClientInstance.post(HttpUrlConstant.GET_USER_INFO, userData).then((response) => {
      return response.data;
    });
  }

  static authAndGetUserInfo(userData: UserAuthenticationRequestModel): AuthAndGetUserInfoResponseModel {
    return ClientInstance.post(HttpUrlConstant.AUTH_AND_GET_USER_INFO, userData).then((response) => {
      return response.data;
    });
  }
}
