import { connect } from 'react-redux';
import SellAssetsAdvancedPage from './sellAssetsAdvanced.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies.filter(c => c.CurrencyCategory === 'Crypto'),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalDashboard: state.userDataStore.GoalDashboard,
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellAssetsAdvancedPage);
