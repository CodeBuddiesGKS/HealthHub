import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientModule } from '../patient/patient.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { BillingModule } from '../billing/billing.module';
import { PhysicianModule } from '../physician/physician.module';
import { OfficeModule } from '../office/office.module';

@NgModule({
    imports: [
        BillingModule,
        CommonModule,
        OfficeModule,
        PatientModule,
        PhysicianModule,
        SchedulerModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
