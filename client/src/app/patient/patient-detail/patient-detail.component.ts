import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    public patientDetailForm: FormGroup;
    public patientEntity: Patient;
    public returnUrl: string;
    public states: any[];

    constructor(private messageService: MessageService,
                private patientService: PatientService,
                private route: ActivatedRoute,
                private utilityService: UtilityService) { }

    ngOnInit() {
        this.returnUrl = '/patient';
        this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Patient' : 'Add Patient';
        this.states = STATES;

        this.patientDetailForm = new FormGroup({
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
                    this.patientDetailForm.controls.firstName.setValue(patient.firstName);
                    this.patientDetailForm.controls.lastName.setValue(patient.lastName);
                    this.patientDetailForm.controls.birthDate.setValue(moment(patient.birthDate));
                    this.patientDetailForm.controls.email.setValue(patient.email);
                    this.patientDetailForm.controls.phone.setValue(patient.phone);
                    this.patientDetailForm.controls.address1.setValue(patient.address1);
                    this.patientDetailForm.controls.address2.setValue(patient.address2);
                    this.patientDetailForm.controls.address3.setValue(patient.address3);
                    this.patientDetailForm.controls.city.setValue(patient.city);
                    this.patientDetailForm.controls.state.setValue(patient.state);
                    this.patientDetailForm.controls.zipcode.setValue(patient.zipcode);
                }
            });
        }
    }

    cancel() {
        this.utilityService.reroute(this.returnUrl);
    }

    save() {
        if (this.patientDetailForm.valid) {
            this.patientEntity = new Patient();
            this.patientEntity.id = this.id;
            this.patientEntity.firstName = this.patientDetailForm.controls.firstName.value;
            this.patientEntity.lastName = this.patientDetailForm.controls.lastName.value;
            this.patientEntity.birthDate = moment(this.patientDetailForm.controls.birthDate.value).toISOString();
            this.patientEntity.email = this.patientDetailForm.controls.email.value;
            this.patientEntity.phone = this.patientDetailForm.controls.phone.value;
            this.patientEntity.address1 = this.patientDetailForm.controls.address1.value;
            this.patientEntity.address2 = this.patientDetailForm.controls.address2.value;
            this.patientEntity.address3 = this.patientDetailForm.controls.address3.value;
            this.patientEntity.city = this.patientDetailForm.controls.city.value;
            this.patientEntity.state = this.patientDetailForm.controls.state.value;
            this.patientEntity.zipcode = this.patientDetailForm.controls.zipcode.value;
            
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
            Object.keys(this.patientDetailForm.controls).forEach(field => {
                const control = this.patientDetailForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            // Use this if nested
            // this.validateAllFormFields(this.patientDetailForm);
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
}
