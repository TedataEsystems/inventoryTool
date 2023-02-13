import { TestBed } from '@angular/core/testing';

import { FavoriteSearchService } from './favorite-search.service';

describe('FavoriteSearchService', () => {
  let service: FavoriteSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
