import type { Disableabale, Selectable } from '../interfaces';

class PITypeEntity implements Disableabale, Selectable {
  PITypeDisplayName: string;
  PITypeName: string;
  PITypeID: string;
}

export { PITypeEntity };
