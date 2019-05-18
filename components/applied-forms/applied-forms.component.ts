import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FormRequestService } from '../../services/form-request.service';
import { HelpersService } from '../../imports';

@Component({
  selector: 'app-applied-forms',
  templateUrl: './applied-forms.component.html',
  styleUrls: ['./applied-forms.component.sass']
})
export class AppliedFormsComponent implements OnInit {

  form: any;

  locale: string;

  pageSizeOptions: Array<number> = [5, 10, 20, 50];

  defaultPageSize = 10;

  pageSize: number;

  page: number;

  slug: any;

  get isPageReady(): boolean {
    return this.form && this.slug;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formRequestService: FormRequestService,
    private helpersService: HelpersService
  ) {
    this.locale = this.helpersService.getLocale();
   }

  ngOnInit() {

    const routeParams = combineLatest(this.activatedRoute.params,
      this.activatedRoute.queryParams, (params, qparams) => ({ params, qparams }));

    routeParams.pipe(
      switchMap((params: any) => {
        this.form = null;

        this.slug = params.params['slug'];
        this.pageSize = +params.qparams['page-size'] || this.defaultPageSize;
        this.page = +params.qparams['page'] || 0;

        return this.formRequestService.getFormWithAppliedForms(this.slug, {
          pageSize: this.pageSize,
          pageIndex: this.page || 0
        });
      })
    ).subscribe(response => this.form = response);
  }

  intval(value: string) {
    return +value;
  }

  changePageOptions(options: { pageSize: number, pageIndex: number }) {

    this.pageSize = options.pageSize;
    this.page = options.pageIndex;

    this.helpersService.navigate(['/form/applied-form/' + this.slug], {
      queryParams: {
        'page-size': options.pageSize,
        'page': options.pageIndex + 1
      }
    });
  }
}
