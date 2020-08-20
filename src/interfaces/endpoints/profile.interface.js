import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class ProfileInterface {

  static getUserInfo(userData) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_INFO, userData).then((response) => {
      return response.data;
    });
  }

  static getUserProfileImage(userData) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_PROFILE_IMAGE, userData).then((response) => {
      return response.data;
    });
  }

  static updatePhoneNumber(phoneNumber) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_PHONE_NUMBER, phoneNumber).then((response) => {
      return response.data;
    });
  }

  static updateEmail(email_address) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_EMAIL_ADDRESS, email_address).then((response) => {
      return response.data;
    });
  }

  static addUserProfileImage(userData) {
    return ClientInstance.post(HttpUrlConstant.ADD_USER_PROFILE_IMAGE, userData).then((response) => {
      return response.data;
    });
  }

  static forgotPassword(userData) {
    return ClientInstance.post(HttpUrlConstant.FORGOT_PASSWORD, userData).then((response) => {
      return response.data;
    });
  }

  static resetPassword(userData) {
    return ClientInstance.post(HttpUrlConstant.RESET_PASSWORD, userData).then((response) => {
      return response.data;
    });
  }

}
