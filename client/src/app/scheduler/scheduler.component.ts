import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AppointmentService } from './shared/appointment.service';
import { MessageService } from '../core/message.service';
import { OfficeService } from '../office/shared/office.service';
import { PatientService } from '../patient/shared/patient.service';
import { PhysicianService } from '../physician/shared/physician.service';

import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';

import { Appointment } from './shared/appointment';
import { Office } from '../office/shared/office';
import { Patient } from '../patient/shared/patient';
import { Physician } from '../physician/shared/physician';

import { forkJoin } from 'rxjs';
import * as moment from 'moment';

const HOURS: string[] = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

export class Schedule {
    constructor(person: Physician | Patient, isPatient: boolean) {
        this.active = true;
        this.appointments = [];
        this.isPatient = isPatient;
        this.person = person;
    }
    public active: boolean;
    public appointments: Appointment[];
    public isPatient: boolean;
    public person: Physician | Patient;
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
    transform(array: any[], prop: string) {
        return array.filter(item => item[prop]);
    }
}

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
    public selectedSchedules: any[] = [];

    constructor(private appointmentService: AppointmentService,
                private dialog: MatDialog,
                private messageService: MessageService,
                private officeService: OfficeService,
                private patientService: PatientService,
                private physicianService: PhysicianService) { }

    ngOnInit() {
        forkJoin(
            // this.officeService.getOffices(),
            this.patientService.getPatients(),
            this.physicianService.getPhysicians(),
        ).subscribe(([patients, physicians]) => {
            // if (!offices) this.messageService.error('Error - Unable to get offices.');
            if (!patients) this.messageService.error('Error - Unable to get physician.');
            if (!physicians) this.messageService.error('Error - Unable to get physician.');
            
            // this.offices = offices;
            this.patients = patients;
            this.physicians = physicians;

            // this.officesWithNestedPhysicians = this.offices.map(office => {
            //     office['physicians'] = this.physicians.filter(physician => {
            //         return physician.officeId === office.id;
            //     });
            //     return office;
            // });
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
                    schedule.appointments.forEach(appointment => {
                        appointment.startTime = moment(appointment.startDate).format('h:mm a');
                        appointment.endTime = moment(appointment.endDate).format('h:mm a');
                    });
                    this.selectedSchedules.push(schedule);
                }
            });
        } else if (schedule) {
            schedule.active = !!option.selected;
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

    refreshSchedules() {
        this.selectedSchedules = [];
        this.patientSelectControl.value.forEach(patient => this.changeSelectedSchedules({ selected: true, value: patient }, true));
        this.physicianSelectControl.value.forEach(physician => this.changeSelectedSchedules({ selected: true, value: physician }, false));
    }
}
