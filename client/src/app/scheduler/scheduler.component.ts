import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';

const HOURS: string[] = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
    public hours = HOURS;
    public offices: any[] = [
        { id: 1, name: 'Atlanta' },
        { id: 2, name: 'Boston' },
        { id: 3, name: 'Chicago' },
        { id: 4, name: 'Minneapolis' },
        { id: 5, name: 'New York' },
        { id: 6, name: 'San Francisco' },
        { id: 7, name: 'SoCal' }
    ];
    public resources: any[] = [
        { name: 'Dr. Peterson', officeId: 4 },
        { name: 'Dr. Hitchens', officeId: 4 },
        { name: 'Dr. Dawkins', officeId: 4 },
        { name: 'Dr. Anderson', officeId: 2 },
        { name: 'Dr. Johnson', officeId: 6 },
        { name: 'Dr. Marshall', officeId: 5 },
        { name: 'Dr. Gibson', officeId: 5 },
        { name: 'Dr. Jones', officeId: 5 }
    ];
    public filteredResources: any[];
    public selectedResources: any[];

    constructor(private dialog: MatDialog) { }

    ngOnInit() {
    }

    addAppointment() {
        const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
            width: '600px',
        })
    }

    filterResources({source}) {
        this.filteredResources = this.resources.filter(resource => {
            return source.selectedOptions.selected.some(selectedOffice => {
                return selectedOffice.value.id === resource.officeId;
            });
        });
    }

    selectResources({source}) {
        this.selectedResources = this.filteredResources.filter(resource => {
            return source.selectedOptions.selected.some(selectedResource => {
                return selectedResource.value.name === resource.name;
            });
        });
    }
}
