import { CurrencyTypeEntity } from './currencyType.entity';
import { PIFieldRequirementEntity } from './piFieldRequirement.entity';
import { PITypeEntity } from './piType.entity';
import { TSTypeEntity } from './tsType.entity';

class PaymentInstrumentRequirementsEntity {
  BankOrLocationListRequired: boolean;
  CreatePaymentInstrumentRequired: boolean;
  CreatePIFieldRequirements: Array<PIFieldRequirementEntity>;
  DepositFundsPIFieldRequirements: Array<PIFieldRequirementEntity>;
  DepositPaymentInstructionsRequired: boolean;
  GenerateCreatePaymentInstrumentHTMLRequired: boolean;
  IsUpdatePaymentInstrumentAllowed: boolean;
  MaximumPaymentInstruments: number;
  PIType: PITypeEntity;
  SupportedCurrencyTypes: Array<CurrencyTypeEntity>;
  TransactionWithCreateAndUpdatePaymentInstrumentRequired: boolean;
  TSType: TSTypeEntity;
  WithdrawCreatePaymentInstrumentRequired: boolean;
  WithdrawCreatePIFieldRequirements: Array<PIFieldRequirementEntity>;
}

export { PaymentInstrumentRequirementsEntity };
