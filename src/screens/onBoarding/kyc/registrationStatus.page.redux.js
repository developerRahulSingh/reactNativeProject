import { connect } from 'react-redux';
import { removeComponentID, storeUserData } from '../../../config/reduxStore/reducers';
import { UserInfoBO } from '../../../models/businessObjects';
import RegistrationStatusPage from './registrationStatus.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
    removeComponentID: () => dispatch(removeComponentID()),
    // storeGoalAllocation: (goalAllocationData: GoalAllocationEntity) => dispatch(storeGoalAllocation(goalAllocationData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStatusPage);
