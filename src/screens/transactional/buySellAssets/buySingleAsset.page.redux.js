import { connect } from 'react-redux';
import BuySingleAssetPage from './buySingleAsset.page';

const mapStateToProps = (state, passProps) => {
  return {
    GoalDashboard: state.userDataStore.GoalDashboard,
    GoalCurrency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === state.userDataStore.GoalDashboard.GoalCurrencyCode)),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    selectedAsset: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === passProps.navigationProps.AssetCurrencyCode)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySingleAssetPage);
