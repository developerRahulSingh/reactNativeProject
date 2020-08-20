import B21RequestModel from '../b21.request.model';
import { BuyAssetsInfoEntity, DepositInfoEntity } from '../entities';

class DepositAmountRequestModel extends B21RequestModel {
  DepositInfo: DepositInfoEntity;
  BuyAssetsInfo: BuyAssetsInfoEntity;

  constructor(DepositInfo: DepositInfoEntity, BuyAssetsInfo: BuyAssetsInfoEntity, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.DepositInfo = DepositInfo;
    this.BuyAssetsInfo = BuyAssetsInfo;
  }
}

export { DepositAmountRequestModel };
