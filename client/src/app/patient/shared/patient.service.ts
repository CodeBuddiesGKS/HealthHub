import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from './patient';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {
    public endpoint = '/server/api/v1/patients';

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.endpoint);
    }

    getPatient(id: number): Observable<Patient> {
        return this.http.get<Patient>(this.endpoint + '/' + id);
    }

    createPatient(patient: Patient) {
        let body = JSON.stringify(patient);
        return this.http.post(this.endpoint, body, httpOptions);
    }

    updatePatient(id: number, patient: Patient): Observable<Patient> {
        let body = JSON.stringify(patient);
        return this.http.put<Patient>(this.endpoint + '/' + id, body, httpOptions);
    }

    deletePatient(id): Observable<Patient> {
        return this.http.delete<Patient>(this.endpoint + '/' + id);
    }
}
