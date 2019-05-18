import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FormRequestService } from '../../services/form-request.service';
import { HelpersService } from '../../../auth/imports';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.sass']
})
export class FormsComponent implements OnInit {

  forms: any;

  pageSizeOptions: Array<number> = [5, 10, 20, 50];

  defaultPageSize = 10;

  pageSize: number;

  page: number;

  locale: string;

  get isPageReady(): boolean {
    return this.forms && true;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formRequestService: FormRequestService,
    private helpersService: HelpersService
  ) {
    this.locale = this.helpersService.getLocale();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap((params: Params) => {
        this.forms = null;

        this.pageSize = +params['page-size'] || this.defaultPageSize;
        this.page = +params['page'] || 0;

        return this.formRequestService.getForms({
          pageSize: +params['page-size'] || this.defaultPageSize,
          pageIndex: +params['page'] || 0
        });
      })
    ).subscribe(response => this.forms = response);
  }

  intval(value: string) {
    return +value;
  }

  changePageOptions(options: { pageSize: number, pageIndex: number }) {

    this.pageSize = options.pageSize;
    this.page = options.pageIndex;

    this.helpersService.navigate(['/forms'], {
      queryParams: {
        'page-size': options.pageSize,
        'page': options.pageIndex + 1
      }
    });
  }
}
