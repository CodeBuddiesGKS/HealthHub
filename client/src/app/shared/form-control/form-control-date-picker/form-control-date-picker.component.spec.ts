import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDatePickerComponent } from './form-control-date-picker.component';

describe('FormControlDatePickerComponent', () => {
  let component: FormControlDatePickerComponent;
  let fixture: ComponentFixture<FormControlDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
