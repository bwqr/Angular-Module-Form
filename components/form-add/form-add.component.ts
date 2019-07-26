import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelpersService, CacheService } from '../../imports';
import { NgForm } from '@angular/forms';
import { FormRequestService } from '../../services/form-request.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit, OnDestroy {

  subs = new Subscription();

  selectedType: any;

  field: any;

  sections: Array<any> = [];

  types: Array<any> = [
    { type: 'radio', name: 'Radio' },
    { type: 'text', name: 'Text' },
    { type: 'email', name: 'E-mail' },
    { type: 'checkbox', name: 'Checkbox' },
    { type: 'file', name: 'File' },
    { type: 'number', name: 'Number' },
    { type: 'select', name: 'Select' }
  ];

  languages: any;

  get isPageReady(): boolean {
    return this.languages && true;
  }

  constructor(
    private requestService: FormRequestService,
    private helpersService: HelpersService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    this.subs.add(
      this.cacheService.get('admin.languages', this.requestService.makeGetRequest('admin.languages'))
        .subscribe(response => this.languages = response)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addOption(field: any, option: string) {
    if (typeof option !== 'undefined' && option.trim()) {
      field.options.push(option);
    }
  }

  removeOption(field: any, index: number) {
    field.options.splice(index, 1);
  }

  addField(section: any, field: any) {
    if (typeof section !== 'undefined') {
      section.fields.push(field);
    }
  }

  removeField(section: any, index: number) {
    section.fields.splice(index, 1);
  }

  addSection(section: string) {
    if (typeof section !== 'undefined' && section.trim()) {
      this.sections.push({ 'title': section, 'fields': [] });
    }
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
  }

  typeChanged() {
    this.field = {
      'title': '',
      'placeHolder': '',
      'type': this.selectedType,
      'required': false
    };

    if (this.selectedType === 'radio' || this.selectedType === 'select' || this.selectedType === 'checkbox') {
      this.field.options = [];
    } else if (this.selectedType === 'file') {
      this.field.accept = '';
    }
  }

  postForm(f: NgForm) {
    const sections = this.nameFields(JSON.parse(JSON.stringify(this.sections)), '');

    this.subs.add(
      this.requestService.postForm({
        name: f.value.name,
        slug: f.value.slug,
        language_id: f.value.language,
        fields: sections
      }).subscribe(response => this.helpersService.navigate(['/forms'])));
  }

  nameFields(toNameSections: any, prefix: string) {
    let index = 0;
    const sections = [];

    const regex = /[^A-Za-z1-9]/g;

    for (const section of toNameSections) {
      let field_index = 0;

      for (const field of section.fields) {
        field.name = prefix + section.title.replace(regex, '_') + '_' + index + '_' + field.title.replace(regex, '_') + '_' + field_index;

        if (field.type === 'radio' || field.type === 'select' || field.type === 'checkbox') {
          let option_index = 0;

          for (const option of field.options) {
            field.options[option_index] = {
              'name': field.name + '_' + option.replace(regex, '_') + '_' + option_index,
              'title': option,
              'value': `${option_index + 1}`,
              'disabled': false
            };

            option_index++;
          }
        }

        field_index++;
      }

      index++;

      sections.push(section);
    }
    return sections;
  }
}
