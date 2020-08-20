import { connect } from 'react-redux';
import { storeUserData } from '../../../config/reduxStore/reducers';
import { UserInfoBO } from '../../../models/businessObjects';
import UploadDocumentPage from './uploadDocument.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
    UserCountry: state.countryDataStore.countries.Countries.find(country => country.CountryCode === state.userDataStore.User.CountryCode),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentPage);
