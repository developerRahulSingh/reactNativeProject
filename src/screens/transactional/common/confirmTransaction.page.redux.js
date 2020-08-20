import { connect } from 'react-redux';
import ConfirmTransactionPage from './confirmTransaction.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies,
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    GoalDashboard: state.userDataStore.GoalDashboard,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransactionPage);

