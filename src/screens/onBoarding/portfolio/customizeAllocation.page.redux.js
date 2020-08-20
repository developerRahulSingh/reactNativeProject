import { connect } from 'react-redux';
import CustomizeAllocationPage from './customizeAllocation.page';

const mapStateToProps = state => {
  return {
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeAllocationPage);
