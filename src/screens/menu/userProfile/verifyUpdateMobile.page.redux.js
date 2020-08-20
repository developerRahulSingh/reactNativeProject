import { connect } from 'react-redux';
import VerifyUpdateMobilePage from './verifyUpdateMobile.page';

const mapStateToProps = state => {
  return {
    componentID: state.commonDataStore.componentID,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUpdateMobilePage);
