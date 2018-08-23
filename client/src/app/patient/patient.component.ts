import { Component, OnInit, ViewChild } from '@angular/core';

import { PatientService } from './shared/patient.service';
import { Patient } from './shared/patient';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    public displayedColumns: string[] = [
        'firstName',
        'phone',
        'email'
    ];
    public dataSource = new MatTableDataSource<Patient>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private patientService: PatientService) { }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getPatients();
    }

    getPatients() {
        this.patientService.getPatients()
            .subscribe(
                data => {
                    this.dataSource.data = data;
                },
                err => console.error(err),
                () => console.log('Patients loaded')
            );
    }
}
