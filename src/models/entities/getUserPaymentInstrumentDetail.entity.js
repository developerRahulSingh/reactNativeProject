import { PIFieldRequirementEntity } from './piFieldRequirement.entity';
import { PITypeEntity } from './piType.entity';

class GetUserPaymentInstrumentDetailEntity {
  PIID: string;
  PIName: string;
  PIType: PITypeEntity;
  PIFieldRequirements: Array<PIFieldRequirementEntity>;
}

export { GetUserPaymentInstrumentDetailEntity };
