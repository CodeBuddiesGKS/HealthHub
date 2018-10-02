import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './billing/billing.component';
import { OfficeComponent } from './office/office.component';
import { OfficeDetailComponent } from './office/office-detail/office-detail.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { PhysicianComponent } from './physician/physician.component';
import { PhysicianDetailComponent } from './physician/physician-detail/physician-detail.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

const routes: Routes = [
    { path: "", redirectTo: "/patient", pathMatch: "full" },
    { path: "patient", component: PatientComponent },
    { path: "patientDetail", component: PatientDetailComponent },
    { path: "patientDetail/:id", component: PatientDetailComponent },

    { path: "billing", component: BillingComponent },

    { path: "scheduler", component: SchedulerComponent },
    
    { path: "office", component: OfficeComponent },
    { path: "officeDetail", component: OfficeDetailComponent },
    { path: "officeDetail/:id", component: OfficeDetailComponent },

    { path: "physician", component: PhysicianComponent },
    { path: "physicianDetail", component: PhysicianDetailComponent },
    { path: "physicianDetail/:id", component: PhysicianDetailComponent },
    
    { path: "**", redirectTo: "/patient", pathMatch: "full" }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
