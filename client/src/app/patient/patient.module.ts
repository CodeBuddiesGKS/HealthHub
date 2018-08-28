import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { PatientService } from './shared/patient.service';

import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent
    ],
    exports: [
        PatientComponent,
        PatientDetailComponent
    ]
})
export class PatientModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PatientModule,
            providers: [
                PatientService
            ]
        }
    }
}