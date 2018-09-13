import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Physician } from './physician';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PhysicianService {
    public endpoint = '/server/api/v1/physicians';

    constructor(private http: HttpClient) { }

    getPhysicians(): Observable<Physician[]> {
        return this.http.get<Physician[]>(this.endpoint);
    }
    
    getPhysiciansByOfficeId(officeId) {
        let path = this.endpoint + '/officeId/' + officeId;
        return this.http.get<Physician[]>(path);
    }

    getPhysician(id: number): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        return this.http.get<Physician>(path);
    }

    createPhysician(physician: Physician): Observable<Physician> {
        let body = JSON.stringify(physician);
        return this.http.post<Physician>(this.endpoint, body, httpOptions);
    }

    updatePhysician(id: number, physician: Physician): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        let body = JSON.stringify(physician);
        return this.http.put<Physician>(path, body, httpOptions);
    }

    deletePhysician(id): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        return this.http.delete<Physician>(path);
    }
}
