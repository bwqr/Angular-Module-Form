import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFormComponent } from './applied-form.component';

describe('AppliedFormComponent', () => {
  let component: AppliedFormComponent;
  let fixture: ComponentFixture<AppliedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
