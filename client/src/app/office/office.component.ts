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
            this.offices = offices;
            this.offices.forEach(office => {
                office.props = {
                    physiciansButtonLabel: 'Show Physicians'
                };
            });
        }, err => {
            this.messageService.error('Error - Unable to get Office List');
        });
    }

    navigate(path: string) {
        this.router.navigateByUrl(path);
    }

    viewPhysicians(office) {
        office.openPhysiciansList = !office.openPhysiciansList;
        office.props.physiciansButtonLabel = office.openPhysiciansList ? 'Hide Physicians' : 'Show Physicians'
        if (!office.physicians) {
            this.physicianService.getPhysiciansByOfficeId(office.id).subscribe(physicians => {
                office.physicians = physicians;
            }, err => {
                this.messageService.error('Error - could not get Physicians List');
            });
        }
    }
}
