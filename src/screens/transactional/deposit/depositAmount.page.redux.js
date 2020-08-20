import { connect } from 'react-redux';
import DepositAmountPage from './depositAmount.page';

const mapStateToProps = state => {
  return {
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositAmountPage);
