import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './imports';
import { FormsComponent } from './components/forms/forms.component';
import { FormComponent } from './components/form/form.component';
import { FormAddComponent } from './components/form-add/form-add.component';
import { AppliedFormsComponent } from './components/applied-forms/applied-forms.component';
import { AppliedFormComponent } from './components/applied-form/applied-form.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'forms', component: FormsComponent },
      { path: 'form/:slug', component: FormComponent },
      { path: 'forms/add', component: FormAddComponent },
      { path: 'applied-forms', component: AppliedFormsComponent },
      { path: 'applied-form/:id', component: AppliedFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
