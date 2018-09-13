import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../core/message.service';
import { PatientService } from '../shared/patient.service';

import { Patient } from '../shared/patient';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
    public id: number;
    public editMode: boolean;
    public pageTitle: string;
    public patientEntity: Patient;

    constructor(private messageService: MessageService,
                private patientService: PatientService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.editMode = false;
        if (this.id) {
            this.editMode = true;
        }

        if (!this.editMode) {
            this.pageTitle = 'Add Patient';
            this.patientEntity = new Patient();
        } else {
            this.pageTitle = 'Edit Patient';

            this.patientService.getPatient(this.id)
                .subscribe(patient => {
                    this.patientEntity = patient;
                }, error => {
                    this.messageService.error('Error - Failed to get patient with id: ' + this.id);
                });
        }
    }

    cancel() {
        // Prompt the user if they are sure (need to add dialogs in)
        // if yes -> redirect to home
        // else fall through and do nothing
        this.router.navigateByUrl('/home');
    }

    save() {
        if (!this.editMode) {
            this.patientService.createPatient(this.patientEntity)
                .subscribe(patient => {
                    this.messageService.success('Patient was successfully created!');
                    this.router.navigateByUrl('/home');
                }, error => {
                    this.messageService.error('Error - Unable to create patient');
                });
        } else {
            this.patientService.updatePatient(this.id, this.patientEntity)
                .subscribe(patient => {
                    this.messageService.success('Patient was successfully saved!');
                    this.router.navigateByUrl('/home');
                }, error => {
                    this.messageService.error('Error - Unable to save patient');
                });
        }
    }
}
