import { connect } from 'react-redux';
import TransactionDetailPage from './transactionDetail.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies.filter(c => c.CurrencyCategory === 'Crypto'),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage);
