import { CurrencyTypeEntity } from './currencyType.entity';
import { PITypeEntity } from './piType.entity';
import { TSTypeEntity } from './tsType.entity';

class PIInfoEntity {
  AcctDisplayName: string;
  PIType: PITypeEntity;
  TSType: TSTypeEntity;
  PIID: string;
  IsDefaultDepositPaymentInstrument: boolean;
  IsDefaultWithdrawalPaymentInstrument: boolean;
  CanDeposit: boolean;
  CanWithdraw: boolean;
  MarkedDeleted: boolean;
  SupportedCurrencyTypes: Array<CurrencyTypeEntity>;
}

export { PIInfoEntity };
