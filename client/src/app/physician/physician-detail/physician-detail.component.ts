import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    ValidatorFn,
    AbstractControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../core/message.service';
import { OfficeService } from '../../office/shared/office.service';
import { PhysicianService } from '../shared/physician.service';

import { Office } from '../../office/shared/office';
import { Physician } from '../shared/physician';

import { GENDERS } from '../shared/genders';
import { Observable, forkJoin, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

function autocompleteMatchValidator(officeList): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!officeList) return null;

        const isOfficeMatch = officeList.some(office => {
            let testVal = typeof control.value === 'string' ? control.value : control.value.title
            let bool = office.title === testVal;
            return bool;
        });
        return !isOfficeMatch ? { 'invalidOffice': { value: control.value } } : null;
    };
}

@Component({
  selector: 'app-physician-detail',
  templateUrl: './physician-detail.component.html',
  styleUrls: ['./physician-detail.component.css']
})
export class PhysicianDetailComponent implements OnInit {
    public editMode: boolean;
    public filteredOffices: Observable<Office[]>;
    public genders: any[];
    public id: number;
    public offices: Office[];
    public pageTitle: string;
    public physicianDetailForm: FormGroup;
    public physicianEntity: Physician;
    public returnUrl: string;

    constructor(private messageService: MessageService,
                private officeService: OfficeService,
                private physicianService: PhysicianService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.returnUrl = '/home/4';
        this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = !!this.id;
        this.genders = GENDERS;
        this.pageTitle = this.editMode ? 'Edit Physician' : 'Add Physician';

        this.physicianDetailForm = new FormGroup({
            office: new FormControl(null),
            firstName: new FormControl(""),
            lastName: new FormControl(""),
            employmentDate: new FormControl(""),
            email: new FormControl(""),
            phone: new FormControl(""),
            gender: new FormControl("")
        });

        forkJoin(
            this.officeService.getOffices(),
            this.editMode ? this.physicianService.getPhysician(this.id) : of(null)
        ).subscribe(([offices, physician]) => {
            if (!offices) this.messageService.error('Error - Unable to get offices.');
            if (!physician && this.editMode) this.messageService.error('Error - Unable to get physician.');
            
            this.offices = offices;

            if (physician) {
                let officeMatch = this.offices.find(office => office.id === physician.officeId);
                this.physicianDetailForm.controls.office.setValue(officeMatch);
                this.physicianDetailForm.controls.firstName.setValue(physician.firstName);
                this.physicianDetailForm.controls.lastName.setValue(physician.lastName);
                this.physicianDetailForm.controls.employmentDate.setValue(moment(physician.employmentDate));
                this.physicianDetailForm.controls.email.setValue(physician.email);
                this.physicianDetailForm.controls.phone.setValue(physician.phone);
                this.physicianDetailForm.controls.gender.setValue(physician.gender);
            }

            this.physicianDetailForm.controls.office.setValidators([Validators.required, autocompleteMatchValidator(this.offices)]);
            this.filteredOffices = this.physicianDetailForm.controls.office.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.title),
                map(value => this._filter(this.offices, value))
            );
        });
    }

    cancel() {
        // Confirmation Dialog
        this.router.navigateByUrl(this.returnUrl);
    }

    displayOffice(office?: Office): string | undefined {
      return office ? office.title : undefined;
    }
    
    matchControlValue(options: any[], prop: string, control: FormControl) {
        if (typeof control.value === 'string') {
            let match = options.find(option => option[prop] === control.value);
            if (match) control.setValue(match);
        }
    }

    officeValidationRequired() {
        return this.physicianDetailForm.controls.office.invalid
            && (this.physicianDetailForm.controls.office.dirty || this.physicianDetailForm.controls.office.touched)
            && this.physicianDetailForm.controls.office.errors.required;
    }

    officeValidationMatch() {
        return this.physicianDetailForm.controls.office.invalid
            && (this.physicianDetailForm.controls.office.dirty || this.physicianDetailForm.controls.office.touched)
            && this.physicianDetailForm.controls.office.value != ''
            && this.physicianDetailForm.controls.office.errors.invalidOffice;
    }
    
    save() {
        if (this.physicianDetailForm.valid) {
            this.physicianEntity = new Physician();
            this.physicianEntity.id = this.id;
            this.physicianEntity.officeId = this.physicianDetailForm.controls.office.value.id;
            this.physicianEntity.firstName = this.physicianDetailForm.controls.firstName.value;
            this.physicianEntity.lastName = this.physicianDetailForm.controls.lastName.value;
            this.physicianEntity.employmentDate = moment(this.physicianDetailForm.controls.employmentDate.value).toISOString();
            this.physicianEntity.email = this.physicianDetailForm.controls.email.value;
            this.physicianEntity.phone = this.physicianDetailForm.controls.phone.value;
            this.physicianEntity.gender = this.physicianDetailForm.controls.gender.value;

            if (!this.editMode) {
                this.physicianService.createPhysician(this.physicianEntity).subscribe(physician => {
                    if (!physician) {
                        this.messageService.error('Error - Unable to create physician.');
                    } else {
                        this.messageService.success('Physician was successfully created!');
                        this.router.navigateByUrl(this.returnUrl);
                    }
                });
            } else {
                this.physicianService.updatePhysician(this.physicianEntity).subscribe(physician => {
                    if (!physician) {
                        this.messageService.error('Error - Unable to save physician.');
                    } else {
                        this.messageService.success('Physician was successfully saved!');
                        this.router.navigateByUrl(this.returnUrl);
                    }
                });
            }
        } else {
            Object.keys(this.physicianDetailForm.controls).forEach(field => {
                const control = this.physicianDetailForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            // Use this if nested
            // this.validateAllFormFields(this.physicianDetailForm);
        }
    }

    // private validateAllFormFields(formGroup: FormGroup) {
    //     Object.keys(formGroup.controls).forEach(field => {
    //         const control = formGroup.get(field);
    //         if (control instanceof FormControl) {
    //             control.markAsTouched({ onlySelf: true });
    //         } else if (control instanceof FormGroup) {
    //             this.validateAllFormFields(control);
    //         }
    //     });
    // }

    private _filter(arr: any[], value: string): any[] {
        const filterValue = value.toLowerCase();
        return arr.filter(item => item.title.toLowerCase().indexOf(filterValue) === 0);
    }
}
