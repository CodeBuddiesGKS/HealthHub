import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Physician } from './physician';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PhysicianService {
    public endpoint = '/server/api/v1/physicians';

    constructor(private http: HttpClient) { }

    getPhysicians(): Observable<Physician[]> {
        return this.http.get<Physician[]>(this.endpoint).pipe(catchError(() => of(null)));
    }
    
    getPhysiciansByOfficeId(officeId) {
        let path = this.endpoint + '/officeId/' + officeId;
        return this.http.get<Physician[]>(path).pipe(catchError(() => of(null)));
    }

    getPhysician(id: number): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        return this.http.get<Physician>(path).pipe(catchError(() => of(null)));
    }

    createPhysician(physician: Physician): Observable<Physician> {
        let body = JSON.stringify(physician);
        return this.http.post<Physician>(this.endpoint, body, httpOptions).pipe(catchError(() => of(null)));
    }

    updatePhysician(id: number, physician: Physician): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        let body = JSON.stringify(physician);
        return this.http.put<Physician>(path, body, httpOptions).pipe(catchError(() => of(null)));
    }

    deletePhysician(id): Observable<Physician> {
        let path = this.endpoint + '/' + id;
        return this.http.delete<Physician>(path).pipe(catchError(() => of(null)));
    }
}
