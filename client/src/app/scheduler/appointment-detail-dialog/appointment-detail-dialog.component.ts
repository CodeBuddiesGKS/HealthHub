import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

export class Appointment {
    constructor() {
        this.startDatetime = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);
        this.endDatetime = moment().add(1, 'hour').format(moment.HTML5_FMT.DATETIME_LOCAL);
        this.resourceId = null;
        this.patientId = null;
        this.description = "";
    }
    startDatetime: string;
    endDatetime: string;
    resourceId: number;
    patientId: number;
    description: string;
}

@Component({
    selector: 'appointment-detail-dialog',
    templateUrl: './appointment-detail-dialog.component.html',
    styleUrls: ['./appointment-detail-dialog.component.css']
})
export class AppointmentDetailDialogComponent implements OnInit {
    public id: number;
    public editMode: boolean;
    public pageTitle: string;
    public appointmentEntity: Appointment;

    public doctors: string[] = ['Dr. Peterson', 'Dr. Johnson', 'Dr. Anderson'];
    public doctorControl = new FormControl();
    public filteredDoctors: Observable<string[]>;
    
    public patients: string[] = ['Jane Yanky', 'Helen Janke', 'Allen Caballero', 'Rhonda Graham'];
    public patientControl = new FormControl();
    public filteredPatients: Observable<string[]>;

    constructor() { }

    ngOnInit() {
        // this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = false;
        if (this.id) {
            this.editMode = true;
        }

        this.filteredDoctors = this.doctorControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.doctors, value))
        );

        this.filteredPatients = this.patientControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.patients, value))
        );

        if (!this.editMode) {
            this.pageTitle = 'Add Appointment';
            this.appointmentEntity = new Appointment();
        } else {
            this.pageTitle = 'Edit Appointment';
            this.appointmentEntity = new Appointment();

            // this.patientService.getPatient(this.id)
            //     .subscribe(patient => {
            //         this.patientEntity = patient;
            //     }, error => {
            //         this.messageService.error('Error - Failed to get patient with id: ' + this.id);
            //     });
        }
    }

    cancel() {
        // close dialog
    }

    save() {
        console.log(this.appointmentEntity);
        // if (!this.editMode) {
        //     this.patientService.createPatient(this.patientEntity)
        //         .subscribe(patient => {
        //             this.messageService.success('Patient was successfully created!');
        //             this.router.navigateByUrl('/home');
        //         }, error => {
        //             this.messageService.error('Error - Unable to create patient');
        //         });
        // } else {
        //     this.patientService.updatePatient(this.id, this.patientEntity)
        //         .subscribe(patient => {
        //             this.messageService.success('Patient was successfully saved!');
        //             this.router.navigateByUrl('/home');
        //         }, error => {
        //             this.messageService.error('Error - Unable to save patient');
        //         });
        // }
    }

    private _filter(arr: any[], value: string): string[] {
        const filterValue = value.toLowerCase();
        return arr.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
    }
}