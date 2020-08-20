import { PaymentDataTypeTransakEntity } from './paymentDataType.transak.entity';

class PaymentDataTypeTransakBankTransferEntity extends PaymentDataTypeTransakEntity {
  IFSCCode: string;
  AccountNumber: string;
  AccountType: string;
}

export { PaymentDataTypeTransakBankTransferEntity };
