import { GoalDashboardBO, UserBO, UserInfoBO } from '../../../../models/businessObjects';
import { REMOVE_GOAL_ALLOCATION, REMOVE_USER_DATA, STORE_GOAL, STORE_GOAL_ALLOCATION, STORE_USER_DATA } from './userData.action.types';

export const storeUserData = (userData: UserBO | UserInfoBO | GoalDashboardBO) => {
  return {
    type: STORE_USER_DATA,
    userData,
  };
};

export const removeUserData = () => {
  return {
    type: REMOVE_USER_DATA,
  };
};

export const storeGoalAllocation = (GoalAllocation) => {
  return {
    type: STORE_GOAL_ALLOCATION,
    GoalAllocation,
  };
};

export const removeGoalAllocationData = () => {
  return {
    type: REMOVE_GOAL_ALLOCATION,
  };
};

export const storeGoal = (Goal) => {
  return {
    type: STORE_GOAL,
    Goal,
  };
};
