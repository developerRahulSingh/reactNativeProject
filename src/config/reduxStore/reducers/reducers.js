import { combineReducers } from 'redux';
import { commonDataReducer, countryDataReducer, currencyDataReducer, dashboardDataReducer, userDataReducer } from '.';

const rootReducer = combineReducers({
  commonDataStore: commonDataReducer,
  countryDataStore: countryDataReducer,
  currencyDataStore: currencyDataReducer,
  dashboardDataStore: dashboardDataReducer,
  userDataStore: userDataReducer,
});

export default rootReducer;
