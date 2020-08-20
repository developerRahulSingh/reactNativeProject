import { connect } from 'react-redux';
import { removeGoalAllocationData } from '../../../config/reduxStore/reducers';
import AlternateLoginPage from './alternateLogin.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    removeGoalAllocationData: () => dispatch(removeGoalAllocationData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlternateLoginPage);
