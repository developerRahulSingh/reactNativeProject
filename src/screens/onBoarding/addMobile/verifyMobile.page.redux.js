import { connect } from 'react-redux';
import { storeCurrencies, storeUserData } from '../../../config/reduxStore/reducers';
import { CurrencyBO, UserInfoBO } from '../../../models/businessObjects';
import VerifyMobilePage from './verifyMobile.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeCurrencies: (currencies: CurrencyBO) => dispatch(storeCurrencies(currencies)),
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMobilePage);
