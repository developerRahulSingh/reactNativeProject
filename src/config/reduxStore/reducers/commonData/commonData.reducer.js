import { HIDE_PROGRESS, REMOVE_COMPONENT_ID, SET_DASHBOARD_SHOWN, SHOW_PROGRESS, STORE_COMPONENT_ID, UPDATE_PROGRESS_STATE } from './commonData.action.types';

const initialState = {
  progressIndicator: 0,
  showingProgressIndicator: false,
  isDashboardShown: false,
  componentID: null,
};

const commonDataReducer = (state = initialState, action) => {
  if (action.type === SHOW_PROGRESS) {
    return {
      ...state,
      progressIndicator: state.progressIndicator + 1,
    };
  } else if (action.type === HIDE_PROGRESS) {
    return {
      ...state,
      progressIndicator: state.progressIndicator - 1,
    };
  } else if (action.type === UPDATE_PROGRESS_STATE) {
    return {
      ...state,
      showingProgressIndicator: action.showingProgressIndicator,
    };
  } else if (action.type === SET_DASHBOARD_SHOWN) {
    return {
      ...state,
      isDashboardShown: action.isDashboardShown,
    };
  } else if (action.type === STORE_COMPONENT_ID) {
    return {
      ...state,
      componentID: action.componentID,
    };
  } else if (action.type === REMOVE_COMPONENT_ID) {
    return {
      ...state,
      componentID: null,
    };
  } else {
    return state;
  }
};

export { commonDataReducer };
