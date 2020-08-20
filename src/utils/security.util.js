import * as Keychain from 'react-native-keychain';

class SecurityUtil {
  static pinCodeSecurityKey = 'B21PINCode';
  static userCredentialsKey = 'B21userCredentials';

  static isPINCodeSecurityEnabled = async (): Promise<boolean> => {
    return Keychain.getGenericPassword({
        service: SecurityUtil.pinCodeSecurityKey,
      })
      .then((result) => {
        return !!result;
      })
      .catch(() => {
        return false;
      });
  };

  static setPINCodeSecurity = async (pinCode: string): Promise<boolean> => {
    return Keychain.setGenericPassword('pinCode', pinCode, {service: SecurityUtil.pinCodeSecurityKey})
      .then((result) => {
        return !!result;
      })
      .catch(() => {
        return false;
      });
  };

  static getPINCodeSecurity = async (): Promise<boolean | string> => {
    return Keychain.getGenericPassword({
        service: SecurityUtil.pinCodeSecurityKey,
      })
      .then((data) => {
        if (data) {
          return data.password;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  };

  static removePINCodeSecurity = async (): Promise<boolean> => {
    return Keychain.resetGenericPassword({service: SecurityUtil.pinCodeSecurityKey});
  };

  static saveUserCredentials = async (username: string, password: string) => {
    return Keychain.setGenericPassword(username, password, {service: SecurityUtil.userCredentialsKey})
      .then((result) => {
        return !!result;
      })
      .catch(() => {
        return false;
      });
  };

  static getUserCredentials = async (): Promise<boolean | { username: string, password: string }> => {
    return Keychain.getGenericPassword({
        service: SecurityUtil.userCredentialsKey,
      })
      .then((data) => {
        if (data) {
          return {username: data.username, password: data.password};
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  };

  static removeUserCredentials = async (): Promise<boolean> => {
    return Keychain.resetGenericPassword({service: SecurityUtil.userCredentialsKey});
  };
}

const getPINCodeSecurity = SecurityUtil.getPINCodeSecurity;
const getUserCredentials = SecurityUtil.getUserCredentials;
const isPINCodeSecurityEnabled = SecurityUtil.isPINCodeSecurityEnabled;
const removePINCodeSecurity = SecurityUtil.removePINCodeSecurity;
const removeUserCredentials = SecurityUtil.removeUserCredentials;
const saveUserCredentials = SecurityUtil.saveUserCredentials;
const setPINCodeSecurity = SecurityUtil.setPINCodeSecurity;

export {
  getPINCodeSecurity,
  getUserCredentials,
  isPINCodeSecurityEnabled,
  removePINCodeSecurity,
  removeUserCredentials,
  saveUserCredentials,
  setPINCodeSecurity,
};
