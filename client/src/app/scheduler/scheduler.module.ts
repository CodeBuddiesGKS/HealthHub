import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AppointmentService } from './shared/appointment.service';

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
export class SchedulerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SchedulerModule,
            providers: [
                AppointmentService
            ]
        }
    }
}
