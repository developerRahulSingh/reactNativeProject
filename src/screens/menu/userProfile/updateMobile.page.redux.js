import { connect } from 'react-redux';
import UpdateMobilePage from './updateMobile.page';

const mapStateToProps = state => {
  return {
    countries: state.countryDataStore.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMobilePage);
