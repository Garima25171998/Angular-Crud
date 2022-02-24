import { TestBed } from '@angular/core/testing';

import { CollectioncenterserviceService } from './collectioncenterservice.service';

describe('CollectioncenterserviceService', () => {
  let service: CollectioncenterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectioncenterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
