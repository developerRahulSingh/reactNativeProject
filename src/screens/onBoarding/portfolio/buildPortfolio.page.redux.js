import { connect } from 'react-redux';
import BuildPortfolioPage from './buildPortfolio.page';

const mapStateToProps = state => {
  return {
    Currencies: state.currencyDataStore.currencies.Currencies.filter(currency => currency.CurrencyCategory === 'Crypto'),
    CurrencyImageBaseURL: state.currencyDataStore.currencies.CurrencyImageBaseURL,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildPortfolioPage);
