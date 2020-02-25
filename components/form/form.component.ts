import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { HelpersService, CacheService } from '../../imports';
import { Subscription } from 'rxjs';
import { FormRequestService } from '../../services/form-request.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { locale } from 'src/app/locale';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  subs = new Subscription();

  form: any;

  languages: Array<any>;

  get isPageReady(): boolean {
    return this.form && this.languages && true;
  }

  constructor(
    public requestService: FormRequestService,
    public service: FormService,
    public helperService: HelpersService,
    public activatedRoute: ActivatedRoute,
    public cacheService: CacheService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.refreshPage();

    this.subs.add(
      this.cacheService.get('languages', this.requestService.makeGetRequest('core.language.languages'))
        .subscribe(response => this.languages = response)
    );
  }

  saveForm(f: NgForm) {
    const data = {
      name: f.value.name,
      slug: f.value.slug,
      language_id: f.value.language_id
    }

    this.subs.add(
      this.requestService.putForm(this.form.id, data)
        .subscribe(response => this.service.openSnack(this.snackBar, locale.save_success, locale.ok, true))
    );
  }

  refreshPage() {
    this.subs.add(
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          this.form = null;

          return this.requestService.getForm(params['id']);
        })
      ).subscribe(response => this.form = response)
    );
  }

  createSection($event: any) {
    this.subs.add(
      this.requestService.postFormSection(this.form.id, $event)
        .subscribe(response => this.refreshPage())
    )
  }

  createField($event: any) {
    this.subs.add(
      this.requestService.postSectionField($event.section_id, $event)
        .subscribe(response => this.refreshPage())
    )
  }

  updateSection($event: any) {
    this.subs.add(
      this.requestService.putSection($event.id, $event)
        .subscribe(response => this.refreshPage())
    );
  }

  updateField($event: any) {
    this.subs.add(
      this.requestService.putSectionField($event.id, $event)
        .subscribe(response => this.refreshPage())
    );
  }

  updateWeights($event: any) {
    this.subs.add(
      this.requestService.putSectionAndFieldWeights($event)
        .subscribe(response => this.service.openSnack(this.snackBar, locale.save_success, locale.ok, true))
    );
  }

  deleteSection($event: any) {
    this.subs.add(
      this.requestService.deleteSection($event).subscribe(response => {
        const index = this.form.sections.findIndex(section => section.id === $event);
        if (index !== -1) {
          this.form.sections.splice(index, 1);
        }

        this.service.openSnack(this.snackBar, locale.delete_success, locale.ok, true);
      })
    );
  }

  deleteField($event: any) {
    this.subs.add(
      this.requestService.deleteField($event).subscribe(response => {
        for (const section of this.form.sections) {
          const index = section.form_fields.findIndex(field => field.id === $event);

          if (index !== -1) {
            this.form.sections.splice(index, 1);

            break;
          }
        }

        this.service.openSnack(this.snackBar, locale.delete_success, locale.ok, true);
      })
    );
  }

  deleteForm() {
    this.service.deleteAlert(locale.delete_ask, () => {
      this.subs.add(
        this.requestService.deleteForm(this.form.id)
          .subscribe(response => this.helperService.navigate(['forms']))
      );
    });

  }
}
