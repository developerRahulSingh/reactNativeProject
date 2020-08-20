import { connect } from 'react-redux';
import { storeUserData } from '../../config/reduxStore/reducers';
import CashBalanceInfoPage from './cashBalanceInfo.page';

const mapStateToProps = state => {
  return {
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    GoalDashboard: state.userDataStore.GoalDashboard,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (GoalDashboard) => dispatch(storeUserData(GoalDashboard)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CashBalanceInfoPage);
