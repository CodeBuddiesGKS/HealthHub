import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from './patient';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {
    public endpoint = '/server/api/v1/patients';

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.endpoint).pipe(catchError(() => of(null)));
    }

    getPatient(id: number): Observable<Patient> {
        let path = this.endpoint + '/' + id;
        return this.http.get<Patient>(path).pipe(catchError(() => of(null)));
    }

    createPatient(patient: Patient): Observable<Patient> {
        let body = JSON.stringify(patient);
        return this.http.post<Patient>(this.endpoint, body, httpOptions).pipe(catchError(() => of(null)));
    }

    updatePatient(patient: Patient): Observable<Patient> {
        let body = JSON.stringify(patient);
        return this.http.put<Patient>(this.endpoint, body, httpOptions).pipe(catchError(() => of(null)));
    }

    deletePatient(id): Observable<Patient> {
        let path = this.endpoint + '/' + id;
        return this.http.delete<Patient>(path).pipe(catchError(() => of(null)));
    }
}
