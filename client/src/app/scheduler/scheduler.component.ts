import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MessageService } from '../core/message.service';
import { OfficeService } from '../office/shared/office.service';
import { PatientService } from '../patient/shared/patient.service';
import { PhysicianService } from '../physician/shared/physician.service';

import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';

import { Office } from '../office/shared/office';
import { Patient } from '../patient/shared/patient';
import { Physician } from '../physician/shared/physician';

import { Observable, forkJoin, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

const HOURS: string[] = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
    public filteredPatients: Patient[] = [];
    public filteredPhysicians: Physician[] = [];
    public hours = HOURS;
    public officesWithNestedPhysicians: any[];
    public offices: Office[];
    public patients: Patient[];
    public physicians: Physician[];
    public selectedSchedules: any[];

    constructor(private dialog: MatDialog,
                private messageService: MessageService,
                private officeService: OfficeService,
                private patientService: PatientService,
                private physicianService: PhysicianService) { }

    ngOnInit() {
        forkJoin(
            this.officeService.getOffices(),
            this.patientService.getPatients(),
            this.physicianService.getPhysicians(),
        ).subscribe(([offices, patients, physicians]) => {
            if (!offices) this.messageService.error('Error - Unable to get offices.');
            if (!patients) this.messageService.error('Error - Unable to get physician.');
            if (!physicians) this.messageService.error('Error - Unable to get physician.');
            
            this.offices = offices;
            this.patients = patients;
            this.physicians = physicians;

            this.officesWithNestedPhysicians = this.offices.map(office => {
                office['physicians'] = this.physicians.filter(physician => {
                    return physician.officeId === office.id;
                });
                return office;
            });
        });
    }

    addAppointment() {
        const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
            width: '600px',
        })
    }

    filterPhysicians({source}) {
        this.filteredPhysicians = this.physicians.filter(physician => {
            return source.selectedOptions.selected.some(selected => {
                return selected.value.id === physician.id;
            });
        });
        this.selectSchedules();
    }

    filterPatients({source}) {
        this.filteredPatients = this.patients.filter(patient => {
            return source.selectedOptions.selected.some(selected => {
                return selected.value.id === patient.id;
            });
        });
        this.selectSchedules();
    }

    selectSchedules() {
        let a: any[] = this.filteredPhysicians;
        let b: any[] = this.filteredPatients;
        this.selectedSchedules = a.concat(b);
    }
}
