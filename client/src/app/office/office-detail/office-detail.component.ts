import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../core/message.service';
import { OfficeService } from '../shared/office.service';

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
    public officeDetailForm: FormGroup;
    public officeEntity: Office;
    public pageTitle: string;
    public returnUrl: string;
    public states: any[];

    constructor(private messageService: MessageService,
        private officeService: OfficeService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.returnUrl = '/home/3';
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
            this.officeService.getOffice(this.id).subscribe(patient => {
                if (!patient) {
                    this.messageService.error('Error - Unable to get patient.');
                } else {
                    this.officeDetailForm.controls.title.setValue(patient.title);
                    this.officeDetailForm.controls.phone.setValue(patient.phone);
                    this.officeDetailForm.controls.address1.setValue(patient.address1);
                    this.officeDetailForm.controls.address2.setValue(patient.address2);
                    this.officeDetailForm.controls.address3.setValue(patient.address3);
                    this.officeDetailForm.controls.city.setValue(patient.city);
                    this.officeDetailForm.controls.state.setValue(patient.state);
                    this.officeDetailForm.controls.zipcode.setValue(patient.zipcode);
                    patient['hours'] && patient['hours'].forEach(officeHour => {
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
        // Confirmation Dialog
        this.router.navigateByUrl(this.returnUrl);
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

            if (!this.editMode) {
                this.officeService.createOffice(this.officeEntity).subscribe(office => {
                    if (!office) {
                        this.messageService.error('Error - Unable to create office.');
                    } else {
                        this.messageService.success('Office was successfully created!');
                        this.router.navigateByUrl(this.returnUrl);
                    }
                });
            } else {
                this.officeService.updateOffice(this.officeEntity).subscribe(office => {
                    if (!office) {
                        this.messageService.error('Error - Unable to save office.');
                    } else {
                        this.messageService.success('Office was successfully saved!');
                        this.router.navigateByUrl(this.returnUrl);
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
