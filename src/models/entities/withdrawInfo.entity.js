import { NameValuePairEntity } from './nameValuePair.entity';

class WithdrawInfoEntity {
  GoalID: string;
  WithdrawInfoType: string;
  WithdrawAmount: number;
  WithdrawAll: boolean;
  WithdrawCurrencyCode: string;
  PIID: string;
  PITypeName: string;
  TSTypeName: string;
  PIName: string;
  PIRequiredFieldValues: Array<NameValuePairEntity>;
}

export { WithdrawInfoEntity };
