import { TestBed } from '@angular/core/testing';

import { OutgoingStatusService } from './outgoing-status.service';

describe('OutgoingStatusService', () => {
  let service: OutgoingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutgoingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
