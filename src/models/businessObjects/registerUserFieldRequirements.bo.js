import { RegisterUserFieldRequirementEntity } from '../entities';

class RegisterUserFieldRequirementsBO {
  CreateUserFieldRequirements: Array<RegisterUserFieldRequirementEntity>;
  NationalIDs: Array<RegisterUserFieldRequirementEntity>;
  Consents: Array<string>;
}

export { RegisterUserFieldRequirementsBO };
