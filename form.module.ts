import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormsComponent } from './components/forms/forms.component';
import { AppliedFormsComponent } from './components/applied-forms/applied-forms.component';
import { FormComponent } from './components/form/form.component';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule,
    NavigationModule
  ],
  declarations: [
    FormsComponent,
    AppliedFormsComponent,
    FormComponent,
  ]
})
export class FormModule { }
