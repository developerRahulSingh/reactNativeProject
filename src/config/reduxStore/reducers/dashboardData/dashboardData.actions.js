import { ADD_GOAL_DASHBOARD } from './dashboardData.action.types';

export const addGoalDashboard = (goalDashboardResponse) => {
  return {
    type: ADD_GOAL_DASHBOARD,
    goalDashboardResponse: goalDashboardResponse,
  };
};
