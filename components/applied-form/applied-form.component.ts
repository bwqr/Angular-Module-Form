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
          for (const section of appliedForm.form.fields) {
            for (const field of section.fields) {
              if (appliedForm.values.hasOwnProperty(field.name)) {
                if (field.type === 'radio' || field.type === 'select') {
                  const index = field.options.findIndex(option => option.value === appliedForm.values[field.name]);
                  appliedForm.values[field.name] = field.options[index]['title'];
                } else if (field.type === 'checkbox') {
                  let result = '';

                  for (const option of field.options) {
                    if (appliedForm.values[field.name][option['name']]) {
                      result += option['title'] + ', ';
                    }
                  }

                  appliedForm.values[field.name] = result;
                } else if (field.type === 'file') {
                  appliedForm.values[field.name] =
                    this.requestService.makeUrl('form.applied-form-file', `${appliedForm.id}/${field.name}?token=`) +
                    this.helpersService.getToken();
                }
              }

            }
          }
          return appliedForm;
        })
      ).subscribe(response => {
        this.appliedForm = response;
        this.subs.add(
          this.requestService.setAppliedFormRead(response.id).subscribe(_response => _response)
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
