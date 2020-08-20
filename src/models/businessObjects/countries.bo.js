import { CountryEntity } from '../entities';

class CountriesBO {
  CountryFlagBaseURL: string;
  Countries: Array<CountryEntity>;

  constructor() {
    this.Countries = [];
  }
}

export { CountriesBO };
