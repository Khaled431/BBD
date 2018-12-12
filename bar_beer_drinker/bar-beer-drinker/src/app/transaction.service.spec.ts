import {TestBed, inject} from '@angular/core/testing';
import {TransactionService} from "./transaction_service";


describe('TransactionServce', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionService]
    });
  });

  it('should be created', inject([TransactionService], (service: TransactionService) => {
    expect(service).toBeTruthy();
  }));
});
