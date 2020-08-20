import { connect } from 'react-redux';
import { storeGoalAllocation } from '../../config/reduxStore/reducers';
import ManageInvestmentAllocationPage from './manageInvestmentAllocation.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies.filter(c => c.CurrencyCategory === 'Crypto'),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
    GoalAllocation: state.userDataStore.GoalAllocation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGoalAllocation: (goalAllocationData) => dispatch(storeGoalAllocation(goalAllocationData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageInvestmentAllocationPage);
