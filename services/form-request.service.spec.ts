import { TestBed } from '@angular/core/testing';

import { FormRequestService } from './form-request.service';

describe('FormRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormRequestService = TestBed.get(FormRequestService);
    expect(service).toBeTruthy();
  });
});
