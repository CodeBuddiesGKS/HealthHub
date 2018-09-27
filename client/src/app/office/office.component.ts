import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../core/message.service';
import { OfficeService } from './shared/office.service';
import { PhysicianService } from '../physician/shared/physician.service';

import { Office } from './shared/office';

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
