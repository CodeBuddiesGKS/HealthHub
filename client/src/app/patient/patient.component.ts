import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
    MatPaginator,
    MatSort,
    MatTableDataSource
} from '@angular/material';

import { MessageService } from '../core/message.service';
import { PatientService } from './shared/patient.service';

import { Patient } from './shared/patient';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    public displayedColumns: string[] = [
        'firstName lastName',
        'phone',
        'email'
    ];
    public dataSource = new MatTableDataSource<Patient>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private messageService: MessageService,
                private patientService: PatientService,
                private router: Router) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, prop) => {
            switch (prop) {
                case 'firstName lastName':
                    return item.firstName + '' + item.lastName;
                case 'phone':
                    return item.phone;
                case 'email':
                    return item.email;
            }
        };
        this.dataSource.sort = this.sort;
        this.getPatients();
    }

    getPatients() {
        this.patientService.getPatients().subscribe(data => {
            this.dataSource.data = data;
        }, err => {
            this.messageService.error('Error - Unable to get Physicians List')
        });
    }

    navigate(path: string) {
        this.router.navigateByUrl(path);
    }
}
