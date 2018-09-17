import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlAutocompleteComponent } from './form-control-autocomplete.component';

describe('FormControlAutocompleteComponent', () => {
  let component: FormControlAutocompleteComponent;
  let fixture: ComponentFixture<FormControlAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
