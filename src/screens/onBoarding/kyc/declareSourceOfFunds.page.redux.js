import { connect } from 'react-redux';
import { storeUserData } from '../../../config/reduxStore/reducers';
import { UserInfoBO } from '../../../models/businessObjects';
import DeclareSourceOfFundsPage from './declareSourceOfFunds.page';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData: UserInfoBO) => dispatch(storeUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeclareSourceOfFundsPage);
