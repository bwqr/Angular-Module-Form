import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FormRequestService } from '../../services/form-request.service';
import { HelpersService } from '../../imports';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  form: any;

  objectKeys: any;

  id: number;

  get isPageReady(): boolean {
    return this.form && this.objectKeys;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formRequestService: FormRequestService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.form = null;

        this.id = +params['id'];

        return this.formRequestService.getForm(+params['id']);
      })
    ).subscribe(response => {
      this.form = response;
      this.objectKeys = Object.keys(this.form.form.fields);

      this.formRequestService.setFormRead(this.id).subscribe();
    });
  }

}
