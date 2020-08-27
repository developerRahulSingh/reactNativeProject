import { connect } from 'react-redux';
import TransactionAssetsHistoryPage from './transactionAssetsHistory.page';

const mapStateToProps = state => {
  return {
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    Currencies: state.currencyDataStore.currencies.Currencies.filter(c => c.CurrencyCategory === 'Crypto'),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAssetsHistoryPage);
