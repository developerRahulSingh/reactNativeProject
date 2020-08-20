import { StateEntity } from '../entities';

class CountryStatesBO {
  CountryCode: string;
  CountryName: string;
  States: Array<StateEntity>;
}

export { CountryStatesBO };
