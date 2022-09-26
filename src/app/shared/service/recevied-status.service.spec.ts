import { TestBed } from '@angular/core/testing';

import { ReceviedStatusService } from './recevied-status.service';

describe('ReceviedStatusService', () => {
  let service: ReceviedStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceviedStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
