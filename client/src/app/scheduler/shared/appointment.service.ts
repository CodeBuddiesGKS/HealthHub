import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Appointment } from './appointment';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentService {
    public endpoint = '/server/api/v1/appointments';

    constructor(private http: HttpClient) { }

    getAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.endpoint).pipe(catchError(() => of(null)));
    }

    getAppointment(id: number): Observable<Appointment> {
        let path = this.endpoint + '/' + id;
        return this.http.get<Appointment>(path).pipe(catchError(() => of(null)));
    }
    
    getAppointmentsByPatientId(patientId) {
        let path = this.endpoint + '/patientId/' + patientId;
        return this.http.get<Appointment[]>(path).pipe(catchError(() => of(null)));
    }
    
    getAppointmentsByPhysicianId(physicianId) {
        let path = this.endpoint + '/physicianId/' + physicianId;
        return this.http.get<Appointment[]>(path).pipe(catchError(() => of(null)));
    }
    
    getAppointmentsByPatientIdBetweenDates(patientId, startDate, endDate) {
        let path = this.endpoint + '/patientIdBetweenDates/' + patientId + '/' + startDate + '/' + endDate;
        return this.http.get<Appointment[]>(path).pipe(catchError(() => of(null)));
    }
    
    getAppointmentsByPhysicianIdBetweenDates(physicianId, startDate, endDate) {
        let path = this.endpoint + '/physicianIdBetweenDates/' + physicianId + '/' + startDate + '/' + endDate;
        return this.http.get<Appointment[]>(path).pipe(catchError(() => of(null)));
    }

    createAppointment(appointment: Appointment): Observable<Appointment> {
        let body = JSON.stringify(appointment);
        return this.http.post<Appointment>(this.endpoint, body, httpOptions).pipe(catchError(() => of(null)));
    }

    updateAppointment(appointment: Appointment): Observable<Appointment> {
        let path = this.endpoint;
        let body = JSON.stringify(appointment);
        return this.http.put<Appointment>(path, body, httpOptions).pipe(catchError(() => of(null)));
    }

    deleteAppointment(id): Observable<Appointment> {
        let path = this.endpoint + '/' + id;
        return this.http.delete<Appointment>(path).pipe(catchError(() => of(null)));
    }
}