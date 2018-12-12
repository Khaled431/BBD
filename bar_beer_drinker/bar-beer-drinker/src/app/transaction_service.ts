import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

export interface Transaction {
  id_transaction,
  bar_name,
  first_name,
  last_name,
  employee_first_name,
  employee_last_name,
  item_name,
  timestamp
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    public http: HttpClient
  ) {
  }

  getTransactionsPerson(first: string, last: string) {
    return this.http.get<Transaction>('/api/transactions/employee/' + first + '-' + last);
  }

  getTransactionsEmployee(first: string, last: string) {
    return this.http.get<Transaction>('/api/transactions/person/' + first + '-' + last);
  }

  getTransactionsItems(name: string) {
    return this.http.get<Transaction>('/api/transactions/item/' + name);
  }

  getTransactions() {
    return this.http.get<Transaction>('/api/transactions');
  }
}
