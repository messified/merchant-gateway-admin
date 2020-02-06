import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transactionReport } from './transaction-report-data';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  constructor(private httpClient: HttpClient) {}

  async getTransactionReport() {
    const url = 'https://www.merchantpaymentpro.com/api/gateway/report/transactions?days=0';

    try {
      // return await this.httpClient.get(url).toPromise();
      return transactionReport;
    } catch (err) {
      console.log(err);
    }
  }
}
