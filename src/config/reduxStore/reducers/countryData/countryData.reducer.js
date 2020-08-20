import { CountriesBO } from '../../../../models/businessObjects';
import { ADD_COUNTRY } from './countryData.action.types';

const initialState = {
  countries: new CountriesBO(),
};

const countryDataReducer = (state = initialState, action) => {
  if (action.type === ADD_COUNTRY) {
    return {...state, countries: action.countries};
  } else {
    return state;
  }
};

export { countryDataReducer };
