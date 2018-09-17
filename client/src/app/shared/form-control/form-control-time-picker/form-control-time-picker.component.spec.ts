import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlTimePickerComponent } from './form-control-time-picker.component';

describe('FormControlTimePickerComponent', () => {
  let component: FormControlTimePickerComponent;
  let fixture: ComponentFixture<FormControlTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
