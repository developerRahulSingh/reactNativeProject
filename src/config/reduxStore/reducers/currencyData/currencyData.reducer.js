import { CurrencyBO } from '../../../../models/businessObjects';
import CurrencyResponseModel from '../../../../models/currency.response.model';
import { ADD_CURRENCY, STORE_CURRENCY } from './currencyData.action.types';

const initialState = {
  currencyResponse: new CurrencyResponseModel(),
  currencies: new CurrencyBO(),
};

const currencyDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENCY:
      return {
        ...state,
        currencyResponse: action.currencyResponse,
      };
    case STORE_CURRENCY:
      return {
        ...state,
        currencies: action.currencies,
      };
    default:
      return state;
  }
};

export { currencyDataReducer };
