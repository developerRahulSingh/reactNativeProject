import { CurrencyAmountEntity } from './currencyAmount.entity';
import { PaymentDataEntity } from './paymentData.entity';
import { PaymentDataTypeTransakBankTransferEntity } from './paymentDataType.transak.bankTransfer.entity';
import { PaymentDataTypeTransakUPIEntity } from './paymentDataType.transak.upi.entity';

class PaymentDataTransakEntity extends PaymentDataEntity {
  Provider: 'Transak';
  Deposit: CurrencyAmountEntity;
  Transaction: CurrencyAmountEntity;
  BankTransfer: PaymentDataTypeTransakBankTransferEntity;
  UPI: PaymentDataTypeTransakUPIEntity;
}


export { PaymentDataTransakEntity };
