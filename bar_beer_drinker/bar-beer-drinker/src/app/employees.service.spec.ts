import { TestBed, inject } from '@angular/core/testing';

import { BeersService } from './beers.service';
import {EmployeesService} from "./employees.service";

describe('EmployeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeersService]
    });
  });

  it('should be created', inject([EmployeesService], (service: BeersService) => {
    expect(service).toBeTruthy();
  }));
});
