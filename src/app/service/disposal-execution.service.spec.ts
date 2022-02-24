import { TestBed } from '@angular/core/testing';

import { DisposalExecutionService } from './disposal-execution.service';

describe('DisposalExecutionService', () => {
  let service: DisposalExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposalExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
