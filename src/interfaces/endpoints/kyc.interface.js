import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class KYCInterface {

  static getRegisterUserFieldRequirements(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_REGISTER_USER_FIELD_REQUIREMENTS, obj).then((response) => {
      return response.data;
    });
  }

  static getCountryStates(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_COUNTRY_STATES, obj).then((response) => {
      return response.data;
    });
  }

  static addAddress(obj) {
    return ClientInstance.post(HttpUrlConstant.ADD_ADDRESS, obj).then((response) => {
      return response.data;
    });
  }

  static updateAddress(obj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_ADDRESS, obj).then((response) => {
      return response.data;
    });
  }

  static updatePerson(userObj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_PERSON, userObj).then((response) => {
      return response.data;
    });
  }

  static resendEmailVerification(emailObj) {
    return ClientInstance.post(HttpUrlConstant.RESEND_EMAIL_VERIFICATION, emailObj).then((response) => {
      return response.data;
    });
  }

  static getSourceOfFunds(fundObj) {
    return ClientInstance.post(HttpUrlConstant.GET_SOURCE_OF_FUNDS, fundObj).then((response) => {
      return response.data;
    });
  }

  static updateSourceOfFunds(obj) {
    return ClientInstance.post(HttpUrlConstant.SET_SOURCE_OF_FUNDS, obj).then((response) => {
      return response.data;
    });
  }

  static getUserInfo(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_INFO, obj).then((response) => {
      return response.data;
    });
  }

  static registerUser(obj) {
    return ClientInstance.post(HttpUrlConstant.REGISTER_USER, obj).then((response) => {
      return response.data;
    });
  }

  static registerUserByDocument(obj) {
    return ClientInstance.post(HttpUrlConstant.REGISTER_USER_BY_DOCUMENT, obj).then((response) => {
      return response.data;
    });
  }

  static updateOptInItem(obj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_OPT_IN_ITEM, obj).then((response) => {
      return response.data;
    });
  }

  static getProofOfIdentityTypes(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_PROOF_OF_IDENTITY_TYPES, obj).then((response) => {
      return response.data;
    });
  }
}
