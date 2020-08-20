import { connect } from 'react-redux';
import { removeGoalAllocationData } from '../../../config/reduxStore/reducers';
import LoginPage from './login.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    removeGoalAllocationData: () => dispatch(removeGoalAllocationData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
