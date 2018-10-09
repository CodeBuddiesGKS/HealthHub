import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AppointmentService } from './shared/appointment.service';
import { MessageService } from '../core/message/message.service';
import { PatientService } from '../patient/shared/patient.service';
import { PhysicianService } from '../physician/shared/physician.service';
import { UtilityService } from '../core/utility/utility.service';

import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';

import { Office } from '../office/shared/office';
import { Patient } from '../patient/shared/patient';
import { Physician } from '../physician/shared/physician';
import { Schedule } from './shared/schedule';

import { HOURS } from './shared/hours';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
    public appointmentDateControl: FormControl = new FormControl(moment().format(moment.HTML5_FMT.DATETIME_LOCAL));
    public hours = HOURS;
    public officesWithNestedPhysicians: any[];
    public offices: Office[];
    public patients: Patient[];
    public patientSelectControl: FormControl = new FormControl();
    public physicians: Physician[];
    public physicianSelectControl: FormControl = new FormControl();
    public selectedSchedules: Schedule[] = [];

    constructor(private appointmentService: AppointmentService,
                private dialog: MatDialog,
                private messageService: MessageService,
                private patientService: PatientService,
                private physicianService: PhysicianService,
                private utilityService: UtilityService) { }

    ngOnInit() {
        forkJoin(
            this.patientService.getPatients(),
            this.physicianService.getPhysicians(),
        ).subscribe(([patients, physicians]) => {
            if (!patients) this.messageService.error('Error - Unable to get physician.');
            if (!physicians) this.messageService.error('Error - Unable to get physician.');
            
            this.patients = patients;
            this.physicians = physicians;
            document.getElementById('timeslot6').scrollIntoView();
            this.preselectSchedules();
        });

        this.appointmentDateControl.valueChanges.subscribe(() => this.refreshSchedules());
    }

    addAppointment() {
        const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(shouldRefresh => {
            if (shouldRefresh) this.refreshSchedules();
        });
    }
    
    changeSelectedSchedules(option, isPatient: boolean) {
        let startDate = moment(this.appointmentDateControl.value).startOf('day').toISOString();
        let endDate = moment(this.appointmentDateControl.value).endOf('day').toISOString();
        let schedule = this.selectedSchedules.find(schedule => schedule.person.id === option.value.id);

        if (option.selected && !schedule) {
            schedule = new Schedule(option.value, isPatient);
            let getAppointments = isPatient
                ? this.appointmentService.getAppointmentsByPatientIdBetweenDates(option.value.id, startDate, endDate)
                : this.appointmentService.getAppointmentsByPhysicianIdBetweenDates(option.value.id, startDate, endDate);
            getAppointments.subscribe(appointments => {
                if (!appointments) {
                    this.messageService.error('Error - Unable to get appointments.');
                } else {
                    schedule.appointments = appointments;
                    this.selectedSchedules.push(schedule);
                }
            });
        } else if (!option.selected && schedule) {
            this.selectedSchedules.splice(this.selectedSchedules.indexOf(schedule), 1);
        }
    }

    deleteAppointment(appointment) {
        this.appointmentService.deleteAppointment(appointment.id).subscribe(deletedAppointment => {
            if (!deletedAppointment) {
                this.messageService.error('Error - Unable to delete appointment');
            } else {
                this.messageService.success('Appointment was successfully deleted!');
                this.refreshSchedules();
            }
        });
    }

    editAppointment(appointment) {
        const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
            width: '600px',
            data: { id: appointment.id }
        });
        dialogRef.afterClosed().subscribe(shouldRefresh => {
            if (shouldRefresh) this.refreshSchedules();
        });
    }

    filterPatients({option, source}) {
        this.changeSelectedSchedules(option, true);
    }
    
    filterPhysicians({option, source}) {
        this.changeSelectedSchedules(option, false);
    }

    mapAppointmentDate(date) {
        let theMoment = moment(date);
        let hours = theMoment.hours();
        let mins = theMoment.minutes();
        let slotOffset = Math.floor(mins / 5);
        let toolbarOffset = 13;
        
        return (hours * 12) + toolbarOffset + slotOffset;
    }

    preselectSchedules() {
        let params = this.utilityService.getQueryParams();
        if (params.patientId) {
            let patient = this.patients.find(p => p.id === +params.patientId);
            patient && this.changeSelectedSchedules({ selected: true, value: patient }, true);
        }
        if (params.physicianId) {
            let physician = this.physicians.find(p => p.id === +params.physicianId);
            physician && this.changeSelectedSchedules({ selected: true, value: physician }, false)
        }
    }

    refreshSchedules() {
        this.selectedSchedules = [];
        this.patientSelectControl.value && this.patientSelectControl.value.forEach(patient => this.changeSelectedSchedules({ selected: true, value: patient }, true));
        this.physicianSelectControl.value && this.physicianSelectControl.value.forEach(physician => this.changeSelectedSchedules({ selected: true, value: physician }, false));
    }
}
