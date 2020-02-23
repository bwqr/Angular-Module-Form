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
      this.cacheService.get('languages', this.requestService.makeGetRequest('core.language.languages'))
        .subscribe(response => this.languages = response)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  postForm(f: NgForm) {
    const data = {
      name: f.value.name,
      slug: f.value.slug,
      language_id: f.value.language_id
    };

    this.subs.add(
      this.requestService.postForm(data)
        .subscribe(response => this.helpersService.navigate(['/forms']))
    );
  }
}