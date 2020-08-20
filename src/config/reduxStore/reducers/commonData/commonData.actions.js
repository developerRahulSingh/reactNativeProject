import { HIDE_PROGRESS, REMOVE_COMPONENT_ID, SET_DASHBOARD_SHOWN, SHOW_PROGRESS, STORE_COMPONENT_ID, UPDATE_PROGRESS_STATE } from './commonData.action.types';

export const showProgress = () => {
  return {
    type: SHOW_PROGRESS,
  };
};
export const hideProgress = () => {
  return {
    type: HIDE_PROGRESS,
  };
};
export const updateProgress = (progressStatus: boolean) => {
  return {
    type: UPDATE_PROGRESS_STATE,
    showingProgressIndicator: progressStatus,
  };
};
export const setDashboardShown = (isDashboardShown: boolean = true) => {
  return {
    type: SET_DASHBOARD_SHOWN,
    isDashboardShown,
  };
};

export const setComponentID = (componentID) => {
  return {
    type: STORE_COMPONENT_ID,
    componentID,
  };
};

export const removeComponentID = () => {
  return {
    type: REMOVE_COMPONENT_ID,
  };
};
