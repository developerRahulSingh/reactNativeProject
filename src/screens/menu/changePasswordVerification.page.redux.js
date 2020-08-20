import { connect } from 'react-redux';
import ChangePasswordVerificationPage from './changePasswordVerification.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordVerificationPage);
