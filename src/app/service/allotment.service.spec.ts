import { TestBed } from '@angular/core/testing';

import { AllotmentService } from './allotment.service';

describe('AllotmentService', () => {
  let service: AllotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
