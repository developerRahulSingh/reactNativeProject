import { connect } from 'react-redux';
import { storeGoal, storeGoalAllocation } from '../../../config/reduxStore/reducers';
import PortfolioAllocationSummaryPage from './portfolioAllocationSummary.page';

const mapStateToProps = state => {
  return {
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalDashboard: state.userDataStore.GoalDashboard,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGoal: (goal) => dispatch(storeGoal(goal)),
    storeGoalAllocation: (goalAllocation) => dispatch(storeGoalAllocation(goalAllocation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioAllocationSummaryPage);
