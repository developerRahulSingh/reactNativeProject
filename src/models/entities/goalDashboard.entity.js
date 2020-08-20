import { AssetPerformanceEntity } from './assetPerformance.entity';
import { UnpurchasedCoinEntity } from './unpurchasedCoin.entity';

class GoalDashboardEntity {
  GoalID: string;
  GoalName: string;
  GoalCurrencyCode: string;
  GoalAmount: number;
  CashBalance: number;
  CashAssetPercentage: number;
  Balance: number;
  AmountInvested: number;
  Gain: number;
  Return: number;
  AssetPerformances: Array<AssetPerformanceEntity>;
  UnpurchasedCoins: Array<UnpurchasedCoinEntity>;
}

export { GoalDashboardEntity };
