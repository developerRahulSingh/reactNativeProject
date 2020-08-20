import { connect } from 'react-redux';
import { addCountry, storeUserData } from '../../../config/reduxStore/reducers';
import { UserBO } from '../../../models/businessObjects';
import SetPasswordPage from './setPassword.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addCountry: (countriesResponse) => dispatch(addCountry(countriesResponse)),
    storeUserData: (userData: UserBO) => dispatch(storeUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordPage);
