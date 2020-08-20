import HttpUrlConstant from '../../constants/http.constant';
import { ClientInstance } from './baseClient';

export default class ReportInterface {

  static getUserTaxBuySellAccountingDetailReport(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_TAX_BUY_SELL_ACCOUNTING_DETAIL_REPORT, obj).then((response) => {
      return response.data;
    });
  }

  static getUserTaxBuySellAccountingSummaryReport(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_TAX_BUY_SELL_ACCOUNTING_SUMMARY_REPORT, obj).then((response) => {
      return response.data;
    });
  }

  static getUserTaxReportingStatementDocument(obj) {
    return ClientInstance.post(HttpUrlConstant.GET_USER_TAX_REPORTING_STATEMENT_DOCUMENT, obj).then((response) => {
      return response.data;
    });
  }

  static getReportDocument() {
    return ClientInstance.get(HttpUrlConstant.GET_REPORT_DOCUMENT).then((response) => {
      return response.data;
    });
  }
}
