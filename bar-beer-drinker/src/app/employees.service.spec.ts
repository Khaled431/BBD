import { TestBed, inject } from '@angular/core/testing';

import { BeersService } from './beers.service';

describe('EmployeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeersService]
    });
  });

  it('should be created', inject([BeersService], (service: BeersService) => {
    expect(service).toBeTruthy();
  }));
});
