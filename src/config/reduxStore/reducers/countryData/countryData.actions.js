import { ADD_COUNTRY } from './countryData.action.types';

export const addCountry = (countries) => {
  return {
    type: ADD_COUNTRY,
    countries,
  };
};
