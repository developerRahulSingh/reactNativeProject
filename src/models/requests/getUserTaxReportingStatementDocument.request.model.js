import B21RequestModel from '../b21.request.model';

class GetUserTaxReportingStatementDocumentRequestModel extends B21RequestModel {
  Year: string;
  ReportFormat: string;

  constructor(Year: string, ReportFormat: string) {
    super();
    this.Year = Year;
    this.ReportFormat = ReportFormat;
  }
}

export { GetUserTaxReportingStatementDocumentRequestModel };
