import { connect } from 'react-redux';
import WithdrawAmountPage from './withdrawAmount.page';

const mapStateToProps = state => {
  return {
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    GoalDashboard: state.userDataStore.GoalDashboard,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawAmountPage);
