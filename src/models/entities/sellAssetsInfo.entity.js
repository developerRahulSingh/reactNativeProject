import { SellAssetEntity } from './sellAsset.entity';

class SellAssetsInfoEntity {
  GoalID: string;
  SellAssetsInfoType: string;
  DesiredCashAmount: number;
  GoalCurrencyCode: string;
  SellAssets: Array<SellAssetEntity>;
}

export { SellAssetsInfoEntity };
