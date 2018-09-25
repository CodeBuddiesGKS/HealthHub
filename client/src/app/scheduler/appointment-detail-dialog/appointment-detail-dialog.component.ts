import { Component, OnInit, Inject } from '@angular/core';
import {
    FormControl,
    ValidatorFn,
    AbstractControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AppointmentService } from '../shared/appointment.service';
import { MessageService } from '../../core/message.service';
import { PatientService } from '../../patient/shared/patient.service';
import { PhysicianService } from '../../physician/shared/physician.service';

import { Appointment } from '../shared/appointment';
import { Patient } from '../../patient/shared/patient';
import { Physician } from '../../physician/shared/physician';

import { Observable, forkJoin, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

function autocompleteMatchValidator(options): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!options) return null;
        const isMatch = options.some(option => {
            let val = typeof control.value === 'string' ? control.value : control.value.firstName + ' ' + control.value.lastName;
            let opVal = option.firstName + ' ' + option.lastName;
            return opVal === val;
        });
        return !isMatch ? { 'invalidMatch': { value: control.value } } : null;
    };
}

@Component({
    selector: 'appointment-detail-dialog',
    templateUrl: './appointment-detail-dialog.component.html',
    styleUrls: ['./appointment-detail-dialog.component.css']
})
export class AppointmentDetailDialogComponent implements OnInit {
    public appointmentEntity: Appointment;
    public appointmentDetailForm: FormGroup;
    public editMode: boolean;
    public filteredPatients: Observable<string[]>;
    public filteredPhysicians: Observable<string[]>;
    public id: number;
    public pageTitle: string;
    public patients: Patient[];
    public physicians: Physician[];

    constructor(private appointmentService: AppointmentService,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<AppointmentDetailDialogComponent>,
                private messageService: MessageService,
                private patientService: PatientService,
                private physicianService: PhysicianService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.data && +this.data.id;
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Appointment' : 'Add Appointment';
        
        this.appointmentDetailForm = new FormGroup({
            startDate: new FormControl(moment().add(1, 'hour').startOf('hour').format(moment.HTML5_FMT.DATETIME_LOCAL)),
            endDate: new FormControl(moment().add(2, 'hour').startOf('hour').format(moment.HTML5_FMT.DATETIME_LOCAL)),
            physician: new FormControl(null),
            patient: new FormControl(null),
            description: new FormControl("")
        });

        forkJoin(
            this.patientService.getPatients(),
            this.physicianService.getPhysicians(),
            this.editMode ? this.appointmentService.getAppointment(this.id) : of(null)
        ).subscribe(([patients, physicians, appointment]) => {
            if (!patients) this.messageService.error('Error - Unable to get patients.');
            if (!physicians) this.messageService.error('Error - Unable to get physicians.');
            if (!appointment && this.editMode) this.messageService.error('Error - Unable to get appointment.');
            
            this.patients = patients;
            this.physicians = physicians;

            if (appointment) {
                let patientMatch = this.patients.find(patient => patient.id === appointment.patientId);
                let physicianMatch = this.physicians.find(physician => physician.id === appointment.physicianId);
                this.appointmentDetailForm.controls.startDate.setValue(moment(appointment.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL));
                this.appointmentDetailForm.controls.endDate.setValue(moment(appointment.endDate).format(moment.HTML5_FMT.DATETIME_LOCAL));
                this.appointmentDetailForm.controls.patient.setValue(patientMatch);
                this.appointmentDetailForm.controls.physician.setValue(physicianMatch);
                this.appointmentDetailForm.controls.description.setValue(appointment.description);
            }

            this.appointmentDetailForm.controls.patient.setValidators([Validators.required, autocompleteMatchValidator(this.patients)]);
            this.appointmentDetailForm.controls.physician.setValidators([Validators.required, autocompleteMatchValidator(this.physicians)]);
            
            this.filteredPatients = this.appointmentDetailForm.controls.patient.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.firstName),
                map(value => this._filter(this.patients, value))
            );
            this.filteredPhysicians = this.appointmentDetailForm.controls.physician.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.firstName),
                map(value => this._filter(this.physicians, value))
            );
        });
    }

    cancel() {
        this.dialogRef.close();
    }

    displayPatient(patient?: Patient): string | undefined {
      return patient ? patient.firstName + ' ' + patient.lastName : undefined;
    }

    displayPhysician(physician?: Physician): string | undefined {
      return physician ? physician.firstName + ' ' + physician.lastName : undefined;
    }

    matchControlValue(options: any[], prop: string, control: FormControl) {
        if (typeof control.value === 'string') {
            let match = options.find(option => option.firstName + ' ' + option.lastName === control.value);
            if (match) control.setValue(match);
        }
    }

    patientValidationRequired() {
        return this.appointmentDetailForm.controls.patient.invalid
            && (this.appointmentDetailForm.controls.patient.dirty || this.appointmentDetailForm.controls.patient.touched)
            && this.appointmentDetailForm.controls.patient.errors.required;
    }

    patientValidationMatch() {
        return this.appointmentDetailForm.controls.patient.invalid
            && (this.appointmentDetailForm.controls.patient.dirty || this.appointmentDetailForm.controls.patient.touched)
            && this.appointmentDetailForm.controls.patient.value != ''
            && this.appointmentDetailForm.controls.patient.errors.invalidMatch;
    }

    physicianValidationRequired() {
        return this.appointmentDetailForm.controls.physician.invalid
            && (this.appointmentDetailForm.controls.physician.dirty || this.appointmentDetailForm.controls.physician.touched)
            && this.appointmentDetailForm.controls.physician.errors.required;
    }

    physicianValidationMatch() {
        return this.appointmentDetailForm.controls.physician.invalid
            && (this.appointmentDetailForm.controls.physician.dirty || this.appointmentDetailForm.controls.physician.touched)
            && this.appointmentDetailForm.controls.physician.value != ''
            && this.appointmentDetailForm.controls.physician.errors.invalidMatch;
    }
    
    save() {
        if (this.appointmentDetailForm.valid) {
            this.appointmentEntity = new Appointment();
            this.appointmentEntity.id = this.id;
            this.appointmentEntity.startDate = moment(this.appointmentDetailForm.controls.startDate.value).toISOString();
            this.appointmentEntity.endDate = moment(this.appointmentDetailForm.controls.endDate.value).toISOString();
            this.appointmentEntity.patientId = this.appointmentDetailForm.controls.patient.value.id;
            this.appointmentEntity.physicianId = this.appointmentDetailForm.controls.physician.value.id;
            this.appointmentEntity.description = this.appointmentDetailForm.controls.description.value;

            if (!this.editMode) {
                this.appointmentService.createAppointment(this.appointmentEntity).subscribe(appointment => {
                    if (!appointment) {
                        this.messageService.error('Error - Unable to create appointment.');
                    } else {
                        this.messageService.success('Appointment was successfully created!');
                        this.dialogRef.close(true);
                    }
                });
            } else {
                this.appointmentService.updateAppointment(this.appointmentEntity).subscribe(appointment => {
                    if (!appointment) {
                        this.messageService.error('Error - Unable to save appointment.');
                    } else {
                        this.messageService.success('Appointment was successfully saved!');
                        this.dialogRef.close(true);
                    }
                });
            }
        } else {
            Object.keys(this.appointmentDetailForm.controls).forEach(field => {
                const control = this.appointmentDetailForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            // Use this if nested
            // this.validateAllFormFields(this.appointmentDetailForm);
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

    private _filter(arr: any[], value: string): string[] {
        const filterValue = value.toLowerCase();
        return arr.filter(item => item.firstName.toLowerCase().indexOf(filterValue) === 0);
    }
}