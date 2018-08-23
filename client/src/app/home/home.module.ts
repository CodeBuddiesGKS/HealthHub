import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { HomeComponent } from './home.component';
import { PatientModule } from '../patient/patient.module';

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        MatToolbarModule,

        PatientModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
