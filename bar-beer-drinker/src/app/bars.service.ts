import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  city: string;
  phone_number: string;
  owner_first: string;
  owner_last: string;
}

export interface BarMenuItem {
  item_name,
  item_cost,
  likes
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/num_transactions-data');
  }
}
