import { connect } from 'react-redux';
import ConfirmNamePage from './confirmName.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
  };

};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNamePage);
