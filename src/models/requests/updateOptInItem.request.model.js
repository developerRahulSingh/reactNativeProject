import B21RequestModel from '../b21.request.model';

class UpdateOptInItemRequestModel extends B21RequestModel {
  OptInTypeName: string;
  OptInDate: string;

  constructor(OptInTypeName: string, OptInDate: string) {
    super();
    this.OptInTypeName = OptInTypeName;
    this.OptInDate = OptInDate;
  }
}

export { UpdateOptInItemRequestModel };
