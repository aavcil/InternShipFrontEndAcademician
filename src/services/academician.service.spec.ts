import { TestBed } from '@angular/core/testing';

import { AcademicianService } from './academician.service';

describe('AcademicianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcademicianService = TestBed.get(AcademicianService);
    expect(service).toBeTruthy();
  });
});
