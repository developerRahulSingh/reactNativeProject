import B21RequestModel from '../b21.request.model';
import { GoalAllocationEntity } from '../entities';

class UpdateGoalAllocationRequestModel extends B21RequestModel {
  GoalAllocation: GoalAllocationEntity;

  constructor(GoalAllocation: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.GoalAllocation = GoalAllocation;
  }
}

export { UpdateGoalAllocationRequestModel };
