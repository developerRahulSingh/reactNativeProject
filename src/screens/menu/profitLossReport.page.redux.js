import { connect } from 'react-redux';
import ProfitLossReportPage from './profitLossReport.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitLossReportPage);
