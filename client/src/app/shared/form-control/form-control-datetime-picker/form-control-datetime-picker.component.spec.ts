import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDatetimePickerComponent } from './form-control-datetime-picker.component';

describe('FormControlDatetimePickerComponent', () => {
  let component: FormControlDatetimePickerComponent;
  let fixture: ComponentFixture<FormControlDatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlDatetimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
