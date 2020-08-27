import { connect } from 'react-redux';
import TransactionAssetsEditPage from './transactionAssetsEdit.page';

const mapStateToProps = state => {
  return {
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAssetsEditPage);
