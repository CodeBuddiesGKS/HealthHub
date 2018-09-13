import { TestBed, inject } from '@angular/core/testing';

import { PhysicianService } from './physician.service';

describe('PhysicianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhysicianService]
    });
  });

  it('should be created', inject([PhysicianService], (service: PhysicianService) => {
    expect(service).toBeTruthy();
  }));
});
