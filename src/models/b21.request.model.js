import commonConstant from '../constants/common.constant';

class B21RequestModel {
  AuthenticationToken: string;
  ProcessInBackground: boolean;

  constructor(AuthenticationToken: string = null) {
    this.AppVersion = global['APP_VERSION'];
    this.AuthenticationToken = AuthenticationToken;
    this.ClientApplicationType = commonConstant['CLIENT_APPLICATION_TYPE'];
    this.ClientDeviceSerialNumber = global['CLIENT_DEVICE_SERIAL_NUMBER'];
    this.ClientIPAddress = global['CLIENT_IP_ADDRESS'];
    this.ClientUserAgent = global['CLIENT_USER_AGENT'];
    this.CultureName = global['CULTURE_NAME'];
    this.DeviceType = global['DEVICE_TYPE'];
    this.ReturnInstrumentationDetails = commonConstant['RETURN_INSTRUMENTATION_DETAILS'];
    this.ProcessInBackground = false;
  }
}

export default B21RequestModel;
