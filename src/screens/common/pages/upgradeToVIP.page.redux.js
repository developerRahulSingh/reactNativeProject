import { connect } from 'react-redux';
import UpgradeToVIPPage from './upgradeToVIP.page';

const mapStateToProps = state => {
  return {
    GoalDashboard: state.userDataStore.GoalDashboard,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeToVIPPage);
