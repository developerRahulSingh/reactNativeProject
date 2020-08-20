import { connect } from 'react-redux';
import ConfirmCountryPage from './confirmCountry.page';

const mapStateToProps = state => {
  return {
    CountryFlagBaseURL: state.countryDataStore.countries.CountryFlagBaseURL,
    Countries: state.countryDataStore.countries.Countries.filter(country => country.SignupSupported === true),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCountryPage);
