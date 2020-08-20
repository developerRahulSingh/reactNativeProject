import { ADD_CURRENCY, STORE_CURRENCY } from './currencyData.action.types';

export const addCurrency = (currencyResponse) => {
  return {
    type: ADD_CURRENCY,
    currencyResponse: currencyResponse,
  };
};
export const storeCurrencies = (currencies) => {
  return {
    type: STORE_CURRENCY,
    currencies: currencies,
  };
};
