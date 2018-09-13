import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        AppointmentDetailDialogComponent,
        SchedulerComponent
    ],
    exports: [
        SchedulerComponent
    ],
    entryComponents: [
        AppointmentDetailDialogComponent
    ]
})
export class SchedulerModule { }
