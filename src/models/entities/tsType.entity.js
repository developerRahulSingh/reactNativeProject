import type { Disableabale, Selectable } from '../interfaces';

class TSTypeEntity implements Disableabale, Selectable {
  TSTypeDisplayName: string;
  TSTypeName: string;
  TSTypeID: string;
}

export { TSTypeEntity };
