import {
  AuthenticationTokenEntity,
  GoalAllocationEntity,
  GoalDashboardEntity,
  GoalEntity,
  OptInItemStoreEntity,
  UserConfigurationInfoEntity,
  UserEntity,
  UserSignupRegistrationInfoEntity,
} from '../../../../models/entities';
import { REMOVE_GOAL_ALLOCATION, REMOVE_USER_DATA, STORE_GOAL, STORE_GOAL_ALLOCATION, STORE_USER_DATA } from './userData.action.types';

const initialState = {
  User: new UserEntity(),
  UserSignupRegistrationInfo: new UserSignupRegistrationInfoEntity(),
  UserConfigurationInfo: new UserConfigurationInfoEntity(),
  OptInInfo: new OptInItemStoreEntity(),
  AuthenticationToken: new AuthenticationTokenEntity(),
  GoalDashboard: new GoalDashboardEntity(),
  GoalAllocation: new GoalAllocationEntity(),
  Goal: new GoalEntity(),
};

const userDataReducer = (state = initialState, action) => {
  if (action.type === STORE_USER_DATA) {
    return {...state, ...action.userData};
  } else if (action.type === REMOVE_USER_DATA) {
    let {User, UserSignupRegistrationInfo, UserConfigurationInfo, OptInInfo, AuthenticationToken, GoalDashboard, ...newState} = state;
    return newState;
  } else if (action.type === STORE_GOAL_ALLOCATION) {
    return {...state, GoalAllocation: action.GoalAllocation};
  } else if (action.type === REMOVE_GOAL_ALLOCATION) {
    return {...state, GoalAllocation: new GoalAllocationEntity()};
  } else if (action.type === STORE_GOAL) {
    return {...state, Goal: action.Goal};
  } else {
    return state;
  }
};

export { userDataReducer };
