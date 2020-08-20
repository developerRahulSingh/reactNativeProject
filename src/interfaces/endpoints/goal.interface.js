import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class GoalInterface {

  static getCurrencies(currencyObj) {
    return ClientInstance.post(HttpUrlConstant.GET_CURRENCIES, currencyObj).then((response) => {
      return response.data;
    });
  }

  static createGoal(goalObj) {
    return ClientInstance.post(HttpUrlConstant.CREATE_GOAL, goalObj).then((response) => {
      return response.data;
    });
  }

  static createGoalAllocation(goalAllocationObj) {
    return ClientInstance.post(HttpUrlConstant.CREATE_GOAL_ALLOCATION, goalAllocationObj).then((response) => {
      return response.data;
    });
  }

  static updateGoalAllocation(goalAllocationObj) {
    return ClientInstance.post(HttpUrlConstant.UPDATE_GOAL_ALLOCATION, goalAllocationObj).then((response) => {
      return response.data;
    });
  }

  static getGoalDashboard(goalDashboardObj) {
    return ClientInstance.post(HttpUrlConstant.GET_GOAL_DASHBOARD, goalDashboardObj).then((response) => {
      return response.data;
    });
  }

  static getGoalAllocation(goalAllocationObj) {
    return ClientInstance.post(HttpUrlConstant.GET_GOAL_ALLOCATION, goalAllocationObj).then((response) => {
      return response.data;
    });
  }
}
