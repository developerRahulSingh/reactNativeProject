import { DeviceTypeInfoEntity, ReasonCodeEntity, SMIEntity } from '../../entities';

export default class B21ResponseModel {
  ErrorCode: string;
  ErrorMsg: string;
  ErrorMsgDebug: string;
  ReasonCodes: Array<ReasonCodeEntity>;
  DeviceTypeInfo: DeviceTypeInfoEntity;
  SMI: SMIEntity;
}
