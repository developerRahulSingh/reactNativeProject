import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class TransactionInterface {

  static buyAssets(obj) {
    return ClientInstance.post(HttpUrlConstant.BUY_ASSETS, obj).then((response) => {
      return response.data;
    });
  }

  static sellAssets(obj) {
    return ClientInstance.post(HttpUrlConstant.SELL_ASSETS, obj).then((response) => {
      return response.data;
    });
  }

  static getUserTransactionHistory(transactionData) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_TRANSACTION_HISTORY, transactionData).then((response) => {
      return response.data;
    });
  }

  static getAssetTransferWalletAddress(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_ASSET_TRANSFER_WALLET_ADDRESS, obj).then((response) => {
      return response.data;
    });
  }

  static getAssetTransferTransactionHistory(transactionData) {
    return ClientInstance.post(HttpUrlConstant.GET_ASSET_TRANSFER_TRANSACTION_HISTORY, transactionData).then((response) => {
      return response.data;
    });
  }

  static updateAssetTransferTransactionAcquisitionInfo(obj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_ASSET_TRANSFER_TRANSACTION_ACQUISITION_INFO, obj).then((response) => {
      return response.data;
    });
  }
}
