import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
    MatPaginator,
    MatSort,
    MatTableDataSource
} from '@angular/material';

import { MessageService } from '../core/message.service';
import { PhysicianService } from './shared/physician.service';

import { Physician } from './shared/physician';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent implements OnInit {
    public displayedColumns: string[] = [
        'firstName lastName',
        'phone',
        'email',
        'options'
    ];
    public dataSource = new MatTableDataSource<Physician>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private messageService: MessageService,
                private physicianService: PhysicianService,
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
        this.getPhysicians();
    }

    deletePhysician(physicianId) {
        this.physicianService.deletePhysician(physicianId).subscribe(deletedPhysician => {
            this.messageService.success('Successfully deleted Physician');
        }, err => {
            this.messageService.error('Error - Unable to delete Physician')
        });
    }

    getPhysicians() {
        this.physicianService.getPhysicians().subscribe(data => {
            this.dataSource.data = data;
        }, err => {
            this.messageService.error('Error - Unable to get Physicians List');
        });
    }

    navigate(path: string) {
        this.router.navigateByUrl(path);
    }
}
