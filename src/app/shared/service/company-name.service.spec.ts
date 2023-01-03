import { TestBed } from '@angular/core/testing';

import { CompanyNameService } from './company-name.service';

describe('CompanyNameService', () => {
  let service: CompanyNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
