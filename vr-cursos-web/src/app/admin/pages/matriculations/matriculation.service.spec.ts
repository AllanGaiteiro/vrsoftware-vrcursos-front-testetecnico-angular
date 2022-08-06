import { TestBed } from '@angular/core/testing';

import { MatriculationService } from './matriculation.service';

describe('MatriculationService', () => {
  let service: MatriculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
