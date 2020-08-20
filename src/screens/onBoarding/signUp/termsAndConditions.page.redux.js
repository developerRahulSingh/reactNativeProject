import { connect } from 'react-redux';
import { storeUserData } from '../../../config/reduxStore/reducers';
import { UserInfoBO } from '../../../models/businessObjects';
import TermsAndConditionsPage from './termsAndConditions.page';

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

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditionsPage);
