import B21RequestModel from '../b21.request.model';
import { GoalEntity } from '../entities';

class CreateGoalRequestModel extends B21RequestModel {
  Goal: GoalEntity;

  constructor(Goal: GoalEntity, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.Goal = Goal;
  }
}

export { CreateGoalRequestModel };
