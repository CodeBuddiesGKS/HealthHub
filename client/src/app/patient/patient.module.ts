import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { PatientService } from './shared/patient.service';

import { PatientComponent } from './patient.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,

        MatPaginatorModule,
        MatSortModule,
        MatTableModule,

        SharedModule,
    ],
    declarations: [
        PatientComponent
    ],
    exports: [
        PatientComponent
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