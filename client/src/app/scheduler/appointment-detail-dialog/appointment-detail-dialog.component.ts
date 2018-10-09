import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AppointmentService } from '../shared/appointment.service';
import { MessageService } from '../../core/message/message.service';
import { PatientService } from '../../patient/shared/patient.service';
import { PhysicianService } from '../../physician/shared/physician.service';
import { UtilityService } from '../../core/utility/utility.service';

import { Appointment } from '../shared/appointment';
import { Patient } from '../../patient/shared/patient';
import { Physician } from '../../physician/shared/physician';

import { Observable, forkJoin, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'appointment-detail-dialog',
    templateUrl: './appointment-detail-dialog.component.html',
    styleUrls: ['./appointment-detail-dialog.component.css']
})
export class AppointmentDetailDialogComponent implements OnInit {
    public appointmentEntity: Appointment;
    public editMode: boolean;
    public filteredPatients: Observable<string[]>;
    public filteredPhysicians: Observable<string[]>;
    public form: FormGroup;
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
                private utilityService: UtilityService) { }

    ngOnInit() {
        this.id = this.data && +this.data.id;
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Appointment' : 'Add Appointment';
        
        this.form = new FormGroup({
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
                this.form.controls.startDate.setValue(moment(appointment.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL));
                this.form.controls.endDate.setValue(moment(appointment.endDate).format(moment.HTML5_FMT.DATETIME_LOCAL));
                this.form.controls.patient.setValue(patientMatch);
                this.form.controls.physician.setValue(physicianMatch);
                this.form.controls.description.setValue(appointment.description);
            }

            this.form.controls.patient.setValidators([Validators.required, this.utilityService.autocompleteMatchValidator(this.patients, 'firstName', 'lastName')]);
            this.form.controls.physician.setValidators([Validators.required, this.utilityService.autocompleteMatchValidator(this.physicians, 'firstName', 'lastName')]);
            
            this.filteredPatients = this.form.controls.patient.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.firstName + ' ' + value.lastName),
                map(value => this.utilityService.filterAutocompleteDropdown(this.patients, value, 'firstName', 'lastName'))
            );
            this.filteredPhysicians = this.form.controls.physician.valueChanges.pipe(
                startWith(''),
                map<any, any>(value => typeof value === 'string' ? value : value.firstName + ' ' + value.lastName),
                map(value => this.utilityService.filterAutocompleteDropdown(this.physicians, value, 'firstName', 'lastName'))
            );
        });
    }

    cancel() {
        this.dialogRef.close();
    }

    displayEntity(entity: any) {
        return entity && this.utilityService.autocompleteDisplayEntity(entity, 'firstName', 'lastName');
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
            this.appointmentEntity = new Appointment();
            this.appointmentEntity.id = this.id;
            this.appointmentEntity.startDate = moment(this.form.controls.startDate.value).toISOString();
            this.appointmentEntity.endDate = moment(this.form.controls.endDate.value).toISOString();
            this.appointmentEntity.patientId = this.form.controls.patient.value.id;
            this.appointmentEntity.physicianId = this.form.controls.physician.value.id;
            this.appointmentEntity.description = this.form.controls.description.value;

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
            this.utilityService.validateAllFormFields(this.form);
        }
    }
}
