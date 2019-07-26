import { Injectable } from '@angular/core';
import { MainService } from '../imports';

@Injectable({
  providedIn: 'root'
})
export class FormService extends MainService {

  constructor() {
    super();
  }
}
