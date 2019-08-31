import { TestBed, inject, async } from '@angular/core/testing';

import { FormRequestService } from './form-request.service';
import { TestingHelper, CoreModule } from '../imports';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

describe('FormRequestService', () => {

  let requestService: FormRequestService;

  const testingHelper = new TestingHelper();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormRequestService],
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes(testingHelper.routes),
        HttpClientModule
      ]
    });

    requestService = TestBed.get(FormRequestService);
  });

  it('should be created', inject([FormRequestService], (service: FormRequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should have correct route for postGallery', async(() => {
    requestService.postForm({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for getAppliedForm', async(() => {
    requestService.getAppliedForm(0)
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for setAppliedFormRead', async(() => {
    requestService.setAppliedFormRead(0)
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));
});
