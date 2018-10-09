import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '../../core/message/message.service';
import { OfficeService } from '../../office/shared/office.service';
import { PhysicianService } from '../shared/physician.service';
import { UtilityService } from '../../core/utility/utility.service';

import { Office } from '../../office/shared/office';
import { Physician } from '../shared/physician';

import { GENDERS } from '../shared/genders';
import { Observable, forkJoin, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

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
    public form: FormGroup;
    public physicianEntity: Physician;
    public returnUrl: string;

    constructor(private messageService: MessageService,
                private officeService: OfficeService,
                private physicianService: PhysicianService,
                private utilityService: UtilityService) { }

    ngOnInit() {
        this.returnUrl = '/physician';
        this.id = +this.utilityService.getRouteParam('id');
        this.editMode = !!this.id;
        this.genders = GENDERS;
        this.pageTitle = this.editMode ? 'Edit Physician' : 'Add Physician';

        this.form = new FormGroup({
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
                this.form.controls.office.setValue(officeMatch);
                this.form.controls.firstName.setValue(physician.firstName);
                this.form.controls.lastName.setValue(physician.lastName);
                this.form.controls.employmentDate.setValue(moment(physician.employmentDate));
                this.form.controls.email.setValue(physician.email);
                this.form.controls.phone.setValue(physician.phone);
                this.form.controls.gender.setValue(physician.gender);
            }

            this.form.controls.office.setValidators([Validators.required, this.utilityService.autocompleteMatchValidator(this.offices, 'title')]);
            this.filteredOffices = this.form.controls.office.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.title),
                map(value => this.utilityService.filterAutocompleteDropdown(this.offices, value, 'title'))
            );
        });
    }

    cancel() {
        // Confirmation Dialog
        this.utilityService.reroute(this.returnUrl);
    }

    displayEntity(entity: any) {
        return entity && this.utilityService.autocompleteDisplayEntity(entity, 'title');
    }

    matchControlValue(options: any[], control: FormControl, ...props: string[]) {
        this.utilityService.autocompleteMatchControlValue(options, control, props);
    }

    formControlRequiredErrorValidation(control: FormControl) {
        return this.utilityService.formControlRequiredErrorValidation(control);
    }

    formControlAutocompleteMatchErrorValidation(control: FormControl) {
        return this.utilityService.formControlAutocompleteMatchErrorValidation(control);
    }
    
    save() {
        if (this.form.valid) {
            this.physicianEntity = new Physician();
            this.physicianEntity.id = this.id;
            this.physicianEntity.officeId = this.form.controls.office.value.id;
            this.physicianEntity.firstName = this.form.controls.firstName.value;
            this.physicianEntity.lastName = this.form.controls.lastName.value;
            this.physicianEntity.employmentDate = moment(this.form.controls.employmentDate.value).toISOString();
            this.physicianEntity.email = this.form.controls.email.value;
            this.physicianEntity.phone = this.form.controls.phone.value;
            this.physicianEntity.gender = this.form.controls.gender.value;

            if (!this.editMode) {
                this.physicianService.createPhysician(this.physicianEntity).subscribe(physician => {
                    if (!physician) {
                        this.messageService.error('Error - Unable to create physician.');
                    } else {
                        this.messageService.success('Physician was successfully created!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            } else {
                this.physicianService.updatePhysician(this.physicianEntity).subscribe(physician => {
                    if (!physician) {
                        this.messageService.error('Error - Unable to save physician.');
                    } else {
                        this.messageService.success('Physician was successfully saved!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            }
        } else {
            this.utilityService.validateAllFormFields(this.form);
        }
    }
}
