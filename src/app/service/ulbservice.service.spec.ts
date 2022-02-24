import { TestBed } from '@angular/core/testing';

import { UlbserviceService } from './ulbservice.service';

describe('UlbserviceService', () => {
  let service: UlbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
