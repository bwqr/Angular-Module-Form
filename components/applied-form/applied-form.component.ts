import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { FormRequestService } from '../../services/form-request.service';
import { Subscription } from 'rxjs';
import { HelpersService } from '../../imports';

@Component({
  selector: 'app-applied-form',
  templateUrl: './applied-form.component.html',
  styleUrls: ['./applied-form.component.scss']
})
export class AppliedFormComponent implements OnInit, OnDestroy {

  subs = new Subscription();

  appliedForm: any;

  valueTable: Array<any> = [];

  get isPageReady(): boolean {
    return this.appliedForm && true;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: FormRequestService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.subs.add(
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => this.requestService.getAppliedForm(params['id'])),
        map((appliedForm: any) => {
          this.valueTable = [];
          const values = appliedForm.values;

          for (const field of appliedForm.form.form_fields) {
            const index = values.findIndex(value => value.field_id === field.id);
            let value = '';

            if (index !== -1) {
              if (field.type === 'radio' || field.type === 'select') {
                const optionIndex = field.options.findIndex(option => option.value === values[index].value);
                if (optionIndex !== -1) {
                  value = field.options[optionIndex].title;
                }
              } else if (field.type === 'file') {
                value = this.requestService.makeUrl('form.applied-form-file', `${appliedForm.id}/${field.id}?token=`) +
                  this.helpersService.getToken();
              } else {
                value = values[index].value;
              }
            }

            this.valueTable.push({ title: field.title, type: field.type, value: value });
          }

          return appliedForm;
        })
      ).subscribe(response => {
        this.appliedForm = response;

        if (!response.is_read) {
          this.subs.add(
            this.requestService.setAppliedFormRead(response.id).subscribe(_response => _response)
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
