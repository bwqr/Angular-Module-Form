import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HelpersService, MainRequestService, RoutingListService } from '../imports';

@Injectable({
  providedIn: 'root'
})
export class FormRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  ) {
    super(http, helpersService, routingListService);
  }

  getForms(paginate: any): Observable<any> {
    return this.makeGetRequest('form.forms', `?page=${paginate.pageIndex}&per-page=${paginate.pageSize}`);
  }

  getFormWithAppliedForms(slug: string, paginate: any): Observable<any> {
    return this.makeGetRequest('form.applied-forms', `${slug}?page=${paginate.pageIndex}&per-page=${paginate.pageSize}`);
  }

  getForm(id: number): Observable<any> {
    return this.makeGetRequest('form.form', `${id}`);
  }

  setFormRead(id: number): Observable<any> {
    return this.makeGetRequest('form.form-read', `${id}`);
  }
}
