import { connect } from 'react-redux';
import ChangePasswordPage from './changePassword.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
