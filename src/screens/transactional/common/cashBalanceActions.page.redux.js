import { connect } from 'react-redux';
import { setComponentID, storeGoalAllocation } from '../../../config/reduxStore/reducers';
import { GoalAllocationEntity } from '../../../models/entities';
import CashBalanceActionsPage from './cashBalanceActions.page';

const mapStateToProps = state => {
  return {
    GoalDashboard: state.userDataStore.GoalDashboard,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
    GoalAllocation: state.userDataStore.GoalAllocation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setComponentID: (componentID: string) => dispatch(setComponentID(componentID)),
    storeGoalAllocation: (goalAllocationData: GoalAllocationEntity) => dispatch(storeGoalAllocation(goalAllocationData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CashBalanceActionsPage);
