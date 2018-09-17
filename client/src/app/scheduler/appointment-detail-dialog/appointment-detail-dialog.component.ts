import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    id: number;
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

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = !!this.id;

        if (!this.editMode) {
            this.pageTitle = 'Add Appointment';
            this.appointmentEntity = new Appointment();
        } else {
            this.pageTitle = 'Edit Appointment';
            this.appointmentEntity = new Appointment();
        }

        this.filteredDoctors = this.doctorControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.doctors, value))
        );

        this.filteredPatients = this.patientControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.patients, value))
        );
    }

    cancel() {
        // close dialog
    }

    save() {
        console.log(this.appointmentEntity);
    }

    private _filter(arr: any[], value: string): string[] {
        const filterValue = value.toLowerCase();
        return arr.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
    }
}