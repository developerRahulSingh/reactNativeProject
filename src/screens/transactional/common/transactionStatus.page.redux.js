import { connect } from 'react-redux';
import TransactionStatusPage from './transactionStatus.page';

const mapStateToProps = state => {
  return {
    isDashboardShown: state.commonDataStore.isDashboardShown,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionStatusPage);

