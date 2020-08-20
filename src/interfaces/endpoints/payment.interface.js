import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class PaymentInterface {

  static getSupportedPaymentInstrumentTypes(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_SUPPORTED_PAYMENT_INSTRUMENT_TYPES, obj).then((response) => {
      return response.data;
    });
  }

  static getUserPaymentInstruments(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_PAYMENT_INSTRUMENTS, obj).then((response) => {
      return response.data;
    });
  }

  static getUserPaymentInstrumentsDetail(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_PAYMENT_INSTRUMENTS_DETAILS, obj).then((response) => {
      return response.data;
    });
  }

  static getPaymentInstrumentRequirements(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_PAYMENT_INSTRUMENT_REQUIREMENTS, obj).then((response) => {
      return response.data;
    });
  }

  static generateCreatePaymentInstrumentHTML(obj) {
    return ClientInstance.post(HttpUrlConstant.GENERATE_CREATE_PAYMENT_INSTRUMENT_HTML, obj).then((response) => {
      return response.data;
    });
  }

  static deposit(obj) {
    return ClientInstance.post(HttpUrlConstant.DEPOSIT, obj).then((response) => {
      return response.data;
    });
  }

  static cancelDeposit(obj) {
    return ClientInstance.post(HttpUrlConstant.CANCEL_DEPOSIT, obj).then((response) => {
      return response.data;
    });
  }

  static markDepositAsInitiatedPayment(obj) {
    return ClientInstance.post(HttpUrlConstant.MARK_DEPOSIT_AS_INITIATED_PAYMENT, obj).then((response) => {
      return response.data;
    });
  }

  static withdraw(obj) {
    return ClientInstance.post(HttpUrlConstant.WITHDRAW, obj).then((response) => {
      return response.data;
    });
  }

  static createUserPaymentInstruments(obj) {
    return ClientInstance.post(HttpUrlConstant.CREATE_PAYMENT_INSTRUMENT, obj).then((response) => {
      return response.data;
    });
  }

  static updateUserPaymentInstruments(obj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_PAYMENT_INSTRUMENT, obj).then((response) => {
      return response.data;
    });
  }

  static GetVoucherServiceProviders(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_VOUCHER_SERVICE_PROVIDERS, obj).then((response) => {
      return response.data;
    });
  }

  static GetPaymentInstrumentBalance(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_PAYMENT_INSTRUMENT_BALANCE, obj).then((response) => {
      return response.data;
    });
  }

  static GetStoreLocations(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_STORE_LOCATIONS, obj).then((response) => {
      return response.data;
    });
  }
}
