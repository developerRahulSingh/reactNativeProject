import { connect } from 'react-redux';
import { removeComponentID, setComponentID, storeUserData } from '../../config/reduxStore/reducers';
import { UserInfoBO } from '../../models/businessObjects';
import UserProfilePage from './userProfile.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
    UserSignupRegistrationInfo: state.userDataStore.UserSignupRegistrationInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
    setComponentID: (componentID: string) => dispatch(setComponentID(componentID)),
    removeComponentID: () => dispatch(removeComponentID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
