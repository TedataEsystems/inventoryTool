import { TestBed } from '@angular/core/testing';

import { ReceviedTypeService } from './recevied-type.service';

describe('ReceviedTypeService', () => {
  let service: ReceviedTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceviedTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
