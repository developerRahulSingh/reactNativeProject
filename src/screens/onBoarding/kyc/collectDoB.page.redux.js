import { connect } from 'react-redux';
import { storeUserData } from '../../../config/reduxStore/reducers';
import { UserInfoBO } from '../../../models/businessObjects';
import CollectDoBPage from './collectDoB.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectDoBPage);
