import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../../core/message/message.service';
import { OfficeService } from '../shared/office.service';
import { UtilityService } from '../../core/utility/utility.service';

import { Office } from '../shared/office';
import { OfficeHour } from '../shared/office-hour';

import { STATES } from '../../core/models/states';

@Component({
    selector: 'app-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
    public id: number;
    public editMode: boolean;
    public hours: OfficeHour[];
    public officeDetailForm: FormGroup;
    public officeEntity: Office;
    public pageTitle: string;
    public returnUrl: string;
    public states: any[];

    constructor(private messageService: MessageService,
        private officeService: OfficeService,
        private route: ActivatedRoute,
        private utilityService: UtilityService) { }

    ngOnInit() {
        this.returnUrl = '/office';
        this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Office' : 'Add Office';
        this.states = STATES;

        this.officeDetailForm = new FormGroup({
            title: new FormControl(""),
            phone: new FormControl(""),
            address1: new FormControl(""),
            address2: new FormControl(""),
            address3: new FormControl(""),
            city: new FormControl(""),
            state: new FormControl(""),
            zipcode: new FormControl(null),
            sundayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            mondayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            tuesdayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            wednesdayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            thursdayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            fridayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            }),
            saturdayHours: new FormGroup({
                openTime: new FormControl(""),
                closeTime: new FormControl("")
            })
        });

        if (this.editMode) {
            this.officeService.getOffice(this.id).subscribe(office => {
                if (!office) {
                    this.messageService.error('Error - Unable to get office.');
                } else {
                    this.officeDetailForm.controls.title.setValue(office.title);
                    this.officeDetailForm.controls.phone.setValue(office.phone);
                    this.officeDetailForm.controls.address1.setValue(office.address1);
                    this.officeDetailForm.controls.address2.setValue(office.address2);
                    this.officeDetailForm.controls.address3.setValue(office.address3);
                    this.officeDetailForm.controls.city.setValue(office.city);
                    this.officeDetailForm.controls.state.setValue(office.state);
                    this.officeDetailForm.controls.zipcode.setValue(office.zipcode);
                    this.hours = office.hours;
                    office.hours && office.hours.forEach(officeHour => {
                        let day: string = "";
                        switch (officeHour.day) {
                            case 0: day = "sundayHours"; break;
                            case 1: day = "mondayHours"; break;
                            case 2: day = "tuesdayHours"; break;
                            case 3: day = "wednesdayHours"; break;
                            case 4: day = "thursdayHours"; break;
                            case 5: day = "fridayHours"; break;
                            case 6: day = "saturdayHours"; break;
                        }
                        this.officeDetailForm.get(day + '.openTime').setValue(officeHour.openTime);
                        this.officeDetailForm.get(day + '.closeTime').setValue(officeHour.closeTime);
                    });
                }
            });
        }
    }

    cancel() {
        this.utilityService.reroute(this.returnUrl);
    }

    save() {
        if (this.officeDetailForm.valid) {
            this.officeEntity = new Office();
            this.officeEntity.id = this.id;
            this.officeEntity.title = this.officeDetailForm.controls.title.value;
            this.officeEntity.phone = this.officeDetailForm.controls.phone.value;
            this.officeEntity.address1 = this.officeDetailForm.controls.address1.value;
            this.officeEntity.address2 = this.officeDetailForm.controls.address2.value;
            this.officeEntity.address3 = this.officeDetailForm.controls.address3.value;
            this.officeEntity.city = this.officeDetailForm.controls.city.value;
            this.officeEntity.state = this.officeDetailForm.controls.state.value;
            this.officeEntity.zipcode = this.officeDetailForm.controls.zipcode.value;
            let officeId = this.id ? this.id : null;
            let sunId = this.hours ? this.hours.find(hour => hour.day === 0).id : null;
            let monId = this.hours ? this.hours.find(hour => hour.day === 1).id : null;
            let tuesId = this.hours ? this.hours.find(hour => hour.day === 2).id : null;
            let wedId = this.hours ? this.hours.find(hour => hour.day === 3).id : null;
            let thurId = this.hours ? this.hours.find(hour => hour.day === 4).id : null;
            let friId = this.hours ? this.hours.find(hour => hour.day === 5).id : null;
            let satId = this.hours ? this.hours.find(hour => hour.day === 6).id : null;
            this.officeEntity.hours = [
                new OfficeHour(sunId, officeId, 0),
                new OfficeHour(monId, officeId, 1),
                new OfficeHour(tuesId, officeId, 2),
                new OfficeHour(wedId, officeId, 3),
                new OfficeHour(thurId, officeId, 4),
                new OfficeHour(friId, officeId, 5),
                new OfficeHour(satId, officeId, 6)
            ];
            this.officeEntity.hours[0].openTime = this.officeDetailForm.get('sundayHours.openTime').value;
            this.officeEntity.hours[0].closeTime = this.officeDetailForm.get('sundayHours.closeTime').value;
            this.officeEntity.hours[1].openTime = this.officeDetailForm.get('mondayHours.openTime').value;
            this.officeEntity.hours[1].closeTime = this.officeDetailForm.get('mondayHours.closeTime').value;
            this.officeEntity.hours[2].openTime = this.officeDetailForm.get('tuesdayHours.openTime').value;
            this.officeEntity.hours[2].closeTime = this.officeDetailForm.get('tuesdayHours.closeTime').value;
            this.officeEntity.hours[3].openTime = this.officeDetailForm.get('wednesdayHours.openTime').value;
            this.officeEntity.hours[3].closeTime = this.officeDetailForm.get('wednesdayHours.closeTime').value;
            this.officeEntity.hours[4].openTime = this.officeDetailForm.get('thursdayHours.openTime').value;
            this.officeEntity.hours[4].closeTime = this.officeDetailForm.get('thursdayHours.closeTime').value;
            this.officeEntity.hours[5].openTime = this.officeDetailForm.get('fridayHours.openTime').value;
            this.officeEntity.hours[5].closeTime = this.officeDetailForm.get('fridayHours.closeTime').value;
            this.officeEntity.hours[6].openTime = this.officeDetailForm.get('saturdayHours.openTime').value;
            this.officeEntity.hours[6].closeTime = this.officeDetailForm.get('saturdayHours.closeTime').value;

            if (!this.editMode) {
                this.officeService.createOffice(this.officeEntity).subscribe(office => {
                    if (!office) {
                        this.messageService.error('Error - Unable to create office.');
                    } else {
                        this.messageService.success('Office was successfully created!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            } else {
                this.officeService.updateOffice(this.officeEntity).subscribe(office => {
                    if (!office) {
                        this.messageService.error('Error - Unable to save office.');
                    } else {
                        this.messageService.success('Office was successfully saved!');
                        this.utilityService.reroute(this.returnUrl);
                    }
                });
            }
        } else {
            Object.keys(this.officeDetailForm.controls).forEach(field => {
                const control = this.officeDetailForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            // Use this if nested
            // this.validateAllFormFields(this.officeDetailForm);
        }
    }

    // private validateAllFormFields(formGroup: FormGroup) {
    //     Object.keys(formGroup.controls).forEach(field => {
    //         const control = formGroup.get(field);
    //         if (control instanceof FormControl) {
    //             control.markAsTouched({ onlySelf: true });
    //         } else if (control instanceof FormGroup) {
    //             this.validateAllFormFields(control);
    //         }
    //     });
    // }
}
