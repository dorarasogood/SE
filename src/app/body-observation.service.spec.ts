import { TestBed } from '@angular/core/testing';

import { BodyObservationService } from './body-observation.service';

describe('BodyObservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodyObservationService = TestBed.get(BodyObservationService);
    expect(service).toBeTruthy();
  });
});
