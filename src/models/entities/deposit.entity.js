import { PaymentDataTransakEntity } from './paymentData.transak.entity';
import { PaymentInstructionsEntity } from './paymentInstructions.entity';
import { PIInfoEntity } from './piInfo.entity';

class DepositEntity {
  BrowserHTML: string;
  DepositTransactionID: string;
  IsPreviousPendingDeposit: boolean;
  PaymentData: PaymentDataTransakEntity;
  PaymentInstructions: PaymentInstructionsEntity;
  PaymentInstrument: PIInfoEntity;
}

export { DepositEntity };
