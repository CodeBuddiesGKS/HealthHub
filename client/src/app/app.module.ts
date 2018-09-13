import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BillingModule } from './billing/billing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { OfficeModule } from './office/office.module';
import { PatientModule } from './patient/patient.module';
import { PhysicianModule } from './physician/physician.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SharedModule } from './shared/shared.module';
import { TestModule } from './test/test.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BillingModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot(),
    FormsModule,
    HomeModule,
    HttpClientModule,
    OfficeModule.forRoot(),
    PatientModule.forRoot(),
    PhysicianModule.forRoot(),
    SchedulerModule,
    SharedModule,
    TestModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
