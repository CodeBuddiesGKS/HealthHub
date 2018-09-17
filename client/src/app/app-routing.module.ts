import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentDetailDialogComponent } from './scheduler/appointment-detail-dialog/appointment-detail-dialog.component';
import { HomeComponent } from './home/home.component';
import { OfficeDetailComponent } from './office/office-detail/office-detail.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { PhysicianDetailComponent } from './physician/physician-detail/physician-detail.component';

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "home/:activeTab", component: HomeComponent },
    { path: "officeDetail", component: OfficeDetailComponent },
    { path: "officeDetail/:id", component: OfficeDetailComponent },
    { path: "patientDetail", component: PatientDetailComponent },
    { path: "patientDetail/:id", component: PatientDetailComponent },
    { path: "physicianDetail", component: PhysicianDetailComponent },
    { path: "physicianDetail/:id", component: PhysicianDetailComponent },
    { path: "test", component: AppointmentDetailDialogComponent },
    { path: "**", redirectTo: "/home", pathMatch: "full" }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
