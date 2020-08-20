import B21RequestModel from '../b21.request.model';
import { BuyAssetsInfoEntity } from '../entities';

class BuyAssetsRequestModel extends B21RequestModel {
  BuyAssetsInfo: BuyAssetsInfoEntity;

  constructor(BuyAssetsInfo: BuyAssetsInfoEntity) {
    super();
    this.BuyAssetsInfo = BuyAssetsInfo;
  };
}

export { BuyAssetsRequestModel };
