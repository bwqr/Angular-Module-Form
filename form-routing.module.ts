import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './components/forms/forms.component';
import { AppliedFormsComponent } from './components/applied-forms/applied-forms.component';
import { FormComponent } from './components/form/form.component';
import { NavigationComponent } from './imports';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'forms', component: FormsComponent },
      { path: 'form/applied-form/:slug', component: AppliedFormsComponent },
      { path: 'form/form/:id', component: FormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
