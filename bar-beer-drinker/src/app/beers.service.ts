import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface BeerMeta {
  bar: string;
  item_count: number,
  item_cost: number;
  num_transactions: number;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) {
  }

  getBeers() {
    return this.http.get<any[]>('/api/item_name');
  }

  getBarsSelling(beer: string) {
    return this.http.get<BeerMeta[]>(`/api/bars-inventory/${beer}`);
  }

  getBeerManufacturers(beer?: string): any {
    if (beer) {
      return this.http.get<string>(`/api/beer-manufacturer/${beer}`);
    }
    return this.http.get<string[]>('/api/item_name-manufacturer');
  }

}
