import B21RequestModel from '../b21.request.model';

class GetAssetTransferWalletAddressRequestModel extends B21RequestModel {
  Direction: string;
  CurrencyCode: string;

  constructor(Direction: string, CurrencyCode: string) {
    super();
    this.Direction = Direction;
    this.CurrencyCode = CurrencyCode;
  }
}

export { GetAssetTransferWalletAddressRequestModel };
