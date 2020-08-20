import B21RequestModel from '../b21.request.model';
import { SellAssetsInfoEntity } from '../entities';

class SellAssetsRequestModel extends B21RequestModel {
  SellAssetsInfo: SellAssetsInfoEntity;

  constructor(SellAssetsInfo: string) {
    super();
    this.SellAssetsInfo = SellAssetsInfo;
  }
}

export { SellAssetsRequestModel };
