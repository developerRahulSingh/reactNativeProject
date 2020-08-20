import B21RequestModel from '../b21.request.model';
import { WithdrawInfoEntity } from '../entities';

class WithdrawAmountRequestModel extends B21RequestModel {
  WithdrawInfo: WithdrawInfoEntity;

  constructor(WithdrawInfo: WithdrawInfoEntity) {
    super();
    this.WithdrawInfo = WithdrawInfo;
  }
}

export { WithdrawAmountRequestModel };
