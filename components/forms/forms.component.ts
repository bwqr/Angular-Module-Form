import { Component, OnInit } from '@angular/core';
import { FormRequestService } from '../../services/form-request.service';
import { FormService } from '../../services/form.service';
import { HelpersService } from '../../imports';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  columns: Array<string> = [
    'İsmi', 'Dil', 'Uzantı'
  ];

  editLink = {
    url: '/form',
    key: 'id'
  };

  constructor(
    public requestService: FormRequestService,
    public service: FormService,
    public helpersService: HelpersService
  ) { }

  ngOnInit() {
  }

  mapRow(row: any) {
    return [
      row.name,
      row.language.name,
      row.slug
    ];
  }
}
