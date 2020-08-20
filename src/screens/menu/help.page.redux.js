import { connect } from 'react-redux';
import HelpPage from './help.page';

const mapStateToProps = state => {
  return {
    User: state.userDataStore.User,
    // PhonePrefixes: state.countryDataStore.countries.Countries.find((country) => country.CountryCode === state.userDataStore.User.CountryCode).PhonePrefixes[0],
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
