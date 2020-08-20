import { connect } from 'react-redux';
import { removeComponentID, setDashboardShown, storeGoalAllocation, storeUserData } from '../../config/reduxStore/reducers';
import { GoalAllocationEntity } from '../../models/entities';
import DashboardPage from './dashboard.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies.filter(c => c.CurrencyCategory === 'Crypto'),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalDashboard: state.userDataStore.GoalDashboard,
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    GoalAllocation: state.userDataStore.GoalAllocation,
    User: state.userDataStore.User,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (GoalDashboard) => dispatch(storeUserData(GoalDashboard)),
    setDashboardShown: () => dispatch(setDashboardShown()),
    storeGoalAllocation: (goalAllocationData: GoalAllocationEntity) => dispatch(storeGoalAllocation(goalAllocationData)),
    removeComponentID: () => dispatch(removeComponentID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
