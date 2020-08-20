export default class CurrencyArrayResponseModel {
  CurrencyID: string;
  CurrencyName: string;
  CurrencyCode: string;
  CurrencyCategory: 'Crypto' | 'Fiat';
  CurrencyCategoryDisplayName: string;
  HexCode: string;
  MinGoalAmount: number;
  MaxGoalAmount: number;
  MinWithdrawalAmount: number;
  MaxWithdrawalAmount: number;
  MinSellAmount: number;
  MaxSellAmount: number;
  MinBuyAmount: number;
  MaxBuyAmount: number;
  CurrencySymbol: string;
  IsPrefixed: boolean;
}
