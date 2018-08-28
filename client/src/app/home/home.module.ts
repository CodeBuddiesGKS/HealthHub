import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientModule } from '../patient/patient.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        PatientModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
