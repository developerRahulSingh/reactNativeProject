import commonConstant from '../../../constants/common.constant';
import B21ResponseModel from './b21.response.model';

export default class HttpResponseModel<T> implements B21ResponseModel {
  Result: T;

  constructor(obj) {
    !!obj && Object.assign(this, obj);
  }

  isSuccessResponse() {
    return !!this.ErrorCode && this.ErrorCode === commonConstant.SUCCESS_CODE;
  }
}
