import { connect } from 'react-redux';
import EarnPage from './earn.page';

const mapStateToProps = state => {
  return {
    B21Currency: state.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === 'B21')),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    User: state.userDataStore.User,
    OptInInfo: state.userDataStore.OptInInfo,
    GoalDashboard: state.userDataStore.GoalDashboard,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EarnPage);
