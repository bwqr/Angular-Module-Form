import { Injectable } from '@angular/core';
import { MainRequestService, HelpersService, RoutingListService } from '../imports';
import { HttpClient } from '@angular/common/http';

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

  postForm(data: any) {
    return this.makePostRequest('form.form', data);
  }

  getAppliedForm(id: number) {
    return this.makeGetRequest('form.applied-form', `${id}`);
  }

  setAppliedFormRead(id: number) {
    return this.makeGetRequest('form.form-read', `${id}`);
  }
}
