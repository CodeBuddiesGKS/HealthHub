import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    public form: FormGroup;
    public officeEntity: Office;
    public pageTitle: string;
    public returnUrl: string;
    public states: any[];

    constructor(private messageService: MessageService,
        private officeService: OfficeService,
        private utilityService: UtilityService) { }

    ngOnInit() {
        this.returnUrl = '/office';
        this.id = +this.utilityService.getRouteParam('id');
        this.editMode = !!this.id;
        this.pageTitle = this.editMode ? 'Edit Office' : 'Add Office';
        this.states = STATES;

        this.form = new FormGroup({
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
                    this.form.controls.title.setValue(office.title);
                    this.form.controls.phone.setValue(office.phone);
                    this.form.controls.address1.setValue(office.address1);
                    this.form.controls.address2.setValue(office.address2);
                    this.form.controls.address3.setValue(office.address3);
                    this.form.controls.city.setValue(office.city);
                    this.form.controls.state.setValue(office.state);
                    this.form.controls.zipcode.setValue(office.zipcode);
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
                        this.form.get(day + '.openTime').setValue(officeHour.openTime);
                        this.form.get(day + '.closeTime').setValue(officeHour.closeTime);
                    });
                }
            });
        }
    }

    cancel() {
        this.utilityService.reroute(this.returnUrl);
    }

    save() {
        if (this.form.valid) {
            this.officeEntity = new Office();
            this.officeEntity.id = this.id;
            this.officeEntity.title = this.form.controls.title.value;
            this.officeEntity.phone = this.form.controls.phone.value;
            this.officeEntity.address1 = this.form.controls.address1.value;
            this.officeEntity.address2 = this.form.controls.address2.value;
            this.officeEntity.address3 = this.form.controls.address3.value;
            this.officeEntity.city = this.form.controls.city.value;
            this.officeEntity.state = this.form.controls.state.value;
            this.officeEntity.zipcode = this.form.controls.zipcode.value;
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
            this.officeEntity.hours[0].openTime = this.form.get('sundayHours.openTime').value;
            this.officeEntity.hours[0].closeTime = this.form.get('sundayHours.closeTime').value;
            this.officeEntity.hours[1].openTime = this.form.get('mondayHours.openTime').value;
            this.officeEntity.hours[1].closeTime = this.form.get('mondayHours.closeTime').value;
            this.officeEntity.hours[2].openTime = this.form.get('tuesdayHours.openTime').value;
            this.officeEntity.hours[2].closeTime = this.form.get('tuesdayHours.closeTime').value;
            this.officeEntity.hours[3].openTime = this.form.get('wednesdayHours.openTime').value;
            this.officeEntity.hours[3].closeTime = this.form.get('wednesdayHours.closeTime').value;
            this.officeEntity.hours[4].openTime = this.form.get('thursdayHours.openTime').value;
            this.officeEntity.hours[4].closeTime = this.form.get('thursdayHours.closeTime').value;
            this.officeEntity.hours[5].openTime = this.form.get('fridayHours.openTime').value;
            this.officeEntity.hours[5].closeTime = this.form.get('fridayHours.closeTime').value;
            this.officeEntity.hours[6].openTime = this.form.get('saturdayHours.openTime').value;
            this.officeEntity.hours[6].closeTime = this.form.get('saturdayHours.closeTime').value;

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
            this.utilityService.validateAllFormFields(this.form);
        }
    }
}
