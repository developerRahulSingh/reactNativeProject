import { GoalAllocationItemEntity } from './goalAllocationItem.entity';

class GoalAllocationEntity {
  GoalAllocationID: string;
  GoalID: string; // not used
  GoalAllocationType: string; // not used
  GoalAllocationItems: Array<GoalAllocationItemEntity>;
}

export { GoalAllocationEntity };
