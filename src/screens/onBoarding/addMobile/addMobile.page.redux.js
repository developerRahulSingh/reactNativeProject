import { connect } from 'react-redux';
import AddMobilePage from './addMobile.page';

const mapStateToProps = state => {
  return {
    countries: state.countryDataStore.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMobilePage);
