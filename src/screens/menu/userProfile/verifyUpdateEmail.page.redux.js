import { connect } from 'react-redux';
import VerifyUpdateEmailPage from './verifyUpdateEmail.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
    componentID: state.commonDataStore.componentID,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUpdateEmailPage);
