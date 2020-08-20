import { connect } from 'react-redux';
import { removeComponentID } from '../../../config/reduxStore/reducers';
import BuildPortfolioStatusPage from './buildPortfolioStatus.page';

const mapStateToProps = state => {
  return {
    componentID: state.commonDataStore.componentID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeComponentID: () => dispatch(removeComponentID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildPortfolioStatusPage);
