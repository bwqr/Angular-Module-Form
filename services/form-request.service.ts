import { Injectable } from '@angular/core';
import { MainRequestService, HelpersService, RoutingListService } from '../imports';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getForm(id: number): Observable<any> {
    return this.makeGetRequest('form.form', `${id}`);
  }

  postForm(data: any): Observable<any> {
    return this.makePostRequest('form.form', data);
  }

  postFormSection(id: number, data: any): Observable<any> {
    return this.makePostRequest('form.form', data, `${id}/section`);
  }

  postSectionField(id: number, data: any): Observable<any> {
    return this.makePostRequest('form.formable.section', data, `${id}/field`);
  }

  putSection(id: number, data: any): Observable<any> {
    return this.makePutRequest('form.formable.section', data, `${id}`);
  }

  putSectionField(id: number, data: any): Observable<any> {
    return this.makePutRequest('form.formable.field', data, `${id}`);
  }

  putSectionAndFieldWeights(data: any): Observable<any> {
    return this.makePutRequest('form.formable.weights', data);
  }

  putForm(id: number, data: any): Observable<any> {
    return this.makePutRequest('form.form', data, `${id}`);
  }

  deleteSection(id: number): Observable<any> {
    return this.makeDeleteRequest('form.formable.section', `${id}`);
  }

  deleteField(id: number): Observable<any> {
    return this.makeDeleteRequest('form.formable.field', `${id}`);
  }

  deleteForm(id: number): Observable<any> {
    return this.makeDeleteRequest('form.form', `${id}`);
  }

  getAppliedForm(id: number): Observable<any> {
    return this.makeGetRequest('form.applied-form', `${id}`);
  }

  setAppliedFormRead(id: number): Observable<any> {
    return this.makeGetRequest('form.form-read', `${id}`);
  }
}
