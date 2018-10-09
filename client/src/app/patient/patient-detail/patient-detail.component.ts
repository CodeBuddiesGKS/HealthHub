import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MessageService } from '../../core/message/message.service';
import { PatientService } from '../shared/patient.service';
import { UtilityService } from '../../core/utility/utility.service';

import { Patient } from '../shared/patient';

import { STATES } from '../../core/models/states';
import * as moment from 'moment';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
    public id: number;
    public editMode: boolean;
    public pageTitle: string;
    public form: FormGroup;
    public patientEntity: Patient;
    public returnUrl: string;
    public states: any[];

    constructor(private messageService: MessageService,
                private patientService: PatientService,
                private utilityService: UtilityService) { }

    ngOnInit() {
        this.returnUrl = '/patient';
        this.id = +this.utilityService.getRouteParam('id');
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Patient' : 'Add Patient';
        this.states = STATES;

        this.form = new FormGroup({
            firstName: new FormControl(""),
            lastName: new FormControl(""),
            birthDate: new FormControl(""),
            email: new FormControl(""),
            phone: new FormControl(""),
            address1: new FormControl(""),
            address2: new FormControl(""),
            address3: new FormControl(""),
            city: new FormControl(""),
            state: new FormControl(""),
            zipcode: new FormControl(null)
        });

        if (this.editMode) {
            this.patientService.getPatient(this.id).subscribe(patient => {
                if (!patient) {
                    this.messageService.error('Error - Unable to get patient.');
                } else {
                    this.form.controls.firstName.setValue(patient.firstName);
                    this.form.controls.lastName.setValue(patient.lastName);
                    this.form.controls.birthDate.setValue(moment(patient.birthDate));
                    this.form.controls.email.setValue(patient.email);
                    this.form.controls.phone.setValue(patient.phone);
                    this.form.controls.address1.setValue(patient.address1);
                    this.form.controls.address2.setValue(patient.address2);
                    this.form.controls.address3.setValue(patient.address3);
                    this.form.controls.city.setValue(patient.city);
                    this.form.controls.state.setValue(patient.state);
                    this.form.controls.zipcode.setValue(patient.zipcode);
                }
            });
        }
    }

    cancel() {
        this.utilityService.reroute(this.returnUrl);
    }

    save() {
        if (this.form.valid) {
            this.patientEntity = new Patient();
            this.patientEntity.id = this.id;
            this.patientEntity.firstName = this.form.controls.firstName.value;
            this.patientEntity.lastName = this.form.controls.lastName.value;
            this.patientEntity.birthDate = moment(this.form.controls.birthDate.value).toISOString();
            this.patientEntity.email = this.form.controls.email.value;
            this.patientEntity.phone = this.form.controls.phone.value;
            this.patientEntity.address1 = this.form.controls.address1.value;
            this.patientEntity.address2 = this.form.controls.address2.value;
            this.patientEntity.address3 = this.form.controls.address3.value;
            this.patientEntity.city = this.form.controls.city.value;
            this.patientEntity.state = this.form.controls.state.value;
            this.patientEntity.zipcode = this.form.controls.zipcode.value;
            
            if (!this.editMode) {
                this.patientService.createPatient(this.patientEntity).subscribe(patient => {
                    if (!patient) {
                        this.messageService.error('Error - Unable to create patient.');
                    } else {
                        this.messageService.success('Patient was successfully created!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            } else {
                this.patientService.updatePatient(this.patientEntity).subscribe(patient => {
                    if (!patient) {
                        this.messageService.error('Error - Unable to save patient.');
                    } else {
                        this.messageService.success('Patient was successfully saved!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            }
        } else {
            this.utilityService.validateAllFormFields(this.form);
        }
    }
}
