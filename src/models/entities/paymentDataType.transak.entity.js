import { CurrencyAmountEntity } from './currencyAmount.entity';

class PaymentDataTypeTransakEntity extends CurrencyAmountEntity {
  PayeeAddress: string;
  PayeeName: string;
  TransactionReference: string;
  TransactionNotes: string;
}

export { PaymentDataTypeTransakEntity };
