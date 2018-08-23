import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from './patient';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {
    public endpoint = '/server/api/v1/patients';

    constructor(private http: HttpClient) { }

    getPatients() {
        return this.http.get<Patient[]>(this.endpoint);
    }

    getPatient(id: number) {
        return this.http.get(this.endpoint + '/' + id);
    }

    createPatient(patient: Patient) {
        let body = JSON.stringify(patient);
        return this.http.post(this.endpoint, body, httpOptions);
    }

    updatePatient(id: number, patient: Patient) {
        let body = JSON.stringify(patient);
        return this.http.put(this.endpoint + '/' + id, body, httpOptions);
    }

    deletePatient(id) {
        return this.http.delete(this.endpoint + '/' + id);
    }
}
