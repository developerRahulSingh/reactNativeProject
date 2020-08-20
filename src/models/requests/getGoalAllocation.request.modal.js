import B21RequestModel from '../b21.request.model';

class GetGoalAllocationRequestModel extends B21RequestModel {
  GoalAllocationID: string;

  constructor(GoalAllocationID: string = null, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.GoalAllocationID = GoalAllocationID;
  }
}

export { GetGoalAllocationRequestModel };
