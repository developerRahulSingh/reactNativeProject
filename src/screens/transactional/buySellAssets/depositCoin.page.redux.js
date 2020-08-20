import { connect } from 'react-redux';
import DepositCoinPage from './depositCoin.page';

const mapStateToProps = (state, passProps) => {
  return {
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    selectedAsset: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === passProps.navigationProps.AssetCurrencyCode)),
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositCoinPage);

