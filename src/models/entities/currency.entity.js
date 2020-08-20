class CurrencyEntity {
  CurrencyID: string;
  CurrencyName: string;
  CurrencyCode: string;
  CurrencyCategory: 'Crypto' | 'Fiat';
  CurrencyCategoryDisplayName: string;
  HexCode: string;
  MinGoalAmount: number;
  MaxGoalAmount: number;
  MinDepositAmount: number;
  MaxDepositAmount: number;
  MinWithdrawalAmount: number;
  MaxWithdrawalAmount: number;
  MinSellAmount: number;
  MaxSellAmount: number;
  MinBuyAmount: number;
  MaxBuyAmount: number;
  Precision: number;
  CurrencySymbol: string;
  IsPrefixed: boolean;
  IsSupportedCurrency: boolean;
  IsSupportedGoalCurrency: boolean;
}

export { CurrencyEntity };
