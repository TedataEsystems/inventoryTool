import { TestBed } from '@angular/core/testing';

import { TypeStatusService } from './type-status.service';

describe('TypeStatusService', () => {
  let service: TypeStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
