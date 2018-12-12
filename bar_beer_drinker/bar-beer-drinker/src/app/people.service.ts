import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

export interface People {
  first_name,
  last_name,
  phone,
  city,
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    public http: HttpClient
  ) {
  }

  getPerson(first: string, last: string) {
    return this.http.get<People>('/api/people/' + first + '-' + last);
  }
}
