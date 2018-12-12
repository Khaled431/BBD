import {Component, OnInit} from '@angular/core';
import {Employee, EmployeesService} from "../employees.service";

declare const Highcharts: any;

@Component({
  selector: 'app/employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeesService) {
    employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }

  ngOnInit() {
  }

}
