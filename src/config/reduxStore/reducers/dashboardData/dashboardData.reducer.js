import { GoalDashboardEntity } from '../../../../models/entities';
import { ADD_GOAL_DASHBOARD } from './dashboardData.action.types';

const initialState = {
  goalDashboardResponse: new GoalDashboardEntity(),
};

const dashboardDataReducer = (state = initialState, action) => {
  if (action.type === ADD_GOAL_DASHBOARD) {
    return {
      ...state,
      goalDashboardResponse: action.goalDashboardResponse,
    };
  } else {
    return state;
  }
};

export { dashboardDataReducer };
