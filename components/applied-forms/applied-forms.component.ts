import { Component, OnInit } from '@angular/core';
import { FormRequestService } from '../../services/form-request.service';
import { FormService } from '../../services/form.service';
import { HelpersService } from 'src/app/user/imports';

@Component({
  selector: 'app-applied-forms',
  templateUrl: './applied-forms.component.html',
  styleUrls: ['./applied-forms.component.scss']
})
export class AppliedFormsComponent implements OnInit {

  columns: Array<string> = [
    'ID', 'Form İsmi', 'Okundu'
  ];

  editLink = {
    url: '/applied-form',
    key: 'id'
  };

  constructor(
    public requestService: FormRequestService,
    public service: FormService,
    public helpersService: HelpersService,
  ) { }

  ngOnInit() {
  }

  mapRow(row: any) {

    const state = row.is_read ? 'Evet' : 'Hayır';

    return [
      row.id,
      row.form.name,
      state
    ];
  }
}
