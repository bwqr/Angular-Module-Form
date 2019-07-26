import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormsComponent } from './components/forms/forms.component';
import { FormComponent } from './components/form/form.component';
import { FormAddComponent } from './components/form-add/form-add.component';
import { AppliedFormsComponent } from './components/applied-forms/applied-forms.component';
import { AppliedFormComponent } from './components/applied-form/applied-form.component';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [
    FormsComponent,
    FormComponent,
    FormAddComponent,
    AppliedFormsComponent,
    AppliedFormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    NavigationModule
  ]
})
export class FormModule { }
