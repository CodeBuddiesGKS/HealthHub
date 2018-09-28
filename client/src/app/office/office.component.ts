import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../core/message.service';
import { OfficeService } from './shared/office.service';
import { PhysicianService } from '../physician/shared/physician.service';

import { Office } from './shared/office';

import * as moment from 'moment';

@Component({
    selector: 'app-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
    public offices: Office[] = [];
    public physiciansButtonLabel: string = 'Show Physicians';

    constructor(private messageService: MessageService,
                private officeService: OfficeService,
                private physicianService: PhysicianService,
                private router: Router) { }

    ngOnInit() {
        this.getOffices();
    }

    getOffices() {
        this.officeService.getOffices().subscribe(offices => {
            if (!offices) {
                this.messageService.error('Error - Unable to get offices.');
            } else {
                this.offices = offices;
                this.offices.forEach(office => {
                    // Guarentee each officeHour is:
                    // sorted 0-6
                    // only has 1 item for each day
                    // has the times formatted
                    let newHours = Array(7);
                    for (let i=0; i < 7; i++) {
                        newHours[i] = Object.assign({}, office.hours.find(hour => hour.day === i));
                        if (newHours[i]) {
                            newHours[i].openTime = moment(newHours[i].openTime, 'HH:mm:ss').format('h:mm a');
                            newHours[i].closeTime = moment(newHours[i].closeTime, 'HH:mm:ss').format('h:mm a');
                        }
                    }
                    office.hours = newHours;
                });
            }
        });
    }

    navigate(path: string) {
        this.router.navigateByUrl(path);
    }

    openPhysicians(office) {
        if (!office.physicians) {
            this.physicianService.getPhysiciansByOfficeId(office.id).subscribe(physicians => {
                if (!physicians) {
                    this.messageService.error('Error - could not get physicians.');
                } else {
                    office.physicians = physicians;
                }
            });
        }
    }
}
