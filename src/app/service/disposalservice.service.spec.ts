import { TestBed } from '@angular/core/testing';

import { DisposalserviceService } from './disposalservice.service';

describe('DisposalserviceService', () => {
  let service: DisposalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
