import { connect } from 'react-redux';
import { removeComponentID, storeGoalAllocation } from '../../config/reduxStore/reducers';
import MenuPage from './menu.page';

const mapStateToProps = state => {
  return {
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
    GoalAllocation: state.userDataStore.GoalAllocation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGoalAllocation: (goalAllocationData) => dispatch(storeGoalAllocation(goalAllocationData)),
    removeComponentID: () => dispatch(removeComponentID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
