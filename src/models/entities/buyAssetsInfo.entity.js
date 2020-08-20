import { BuyAssetEntity } from './buyAsset.entity';

class BuyAssetsInfoEntity {
  BuyAssetsInfoType: string;
  GoalID: string;
  GoalAllocationCashAmount: number;
  GoalCurrencyCode: string;
  BuyAssets: Array<BuyAssetEntity>;
}

export { BuyAssetsInfoEntity };
