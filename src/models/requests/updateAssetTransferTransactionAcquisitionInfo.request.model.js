import B21RequestModel from '../b21.request.model';

class UpdateAssetTransferTransactionAcquisitionInfoRequestModel extends B21RequestModel {
  AssetTransferTransactionID: string;
  CostBasisInUSD: number;
  AcquisitionDate: string;

  constructor(AssetTransferTransactionID: string, CostBasisInUSD: number, AcquisitionDate: string) {
    super();
    this.AssetTransferTransactionID = AssetTransferTransactionID;
    this.CostBasisInUSD = CostBasisInUSD;
    this.AcquisitionDate = AcquisitionDate;
  }
}

export { UpdateAssetTransferTransactionAcquisitionInfoRequestModel };
