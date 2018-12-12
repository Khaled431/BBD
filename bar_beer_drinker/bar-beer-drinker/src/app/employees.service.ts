import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

export interface Employee {
  bar_name,
  first_name,
  last_name,
  shift_hour_start,
  shift_hour_end,
  shift_day_of_week
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    public http: HttpClient
  ) {
  }

  getEmployees() {
    return this.http.get<Employee[]>('/api/employees');
  }

  getEmployee(employee: string) {
    return this.http.get<Employee>('/api/employees/' + employee);
  }
}
