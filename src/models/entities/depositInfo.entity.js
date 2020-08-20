import { NameValuePairEntity } from './nameValuePair.entity';

class DepositInfoEntity {
  DepositInfoType: string;
  GoalID: string;
  PISourceCurrencyAmount: number;
  PISourceCurrencyCode: string;
  PIID: string;
  PITypeName: string;
  TSTypeName: string;
  PIName: string;
  PIRequiredFieldValues: Array<NameValuePairEntity>;
}

export { DepositInfoEntity };
