import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Office } from './office';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OfficeService {
    public endpoint = '/server/api/v1/offices';

    constructor(private http: HttpClient) { }

    getOffices(): Observable<Office[]> {
        return this.http.get<Office[]>(this.endpoint);
    }

    getOffice(id: number): Observable<Office> {
        return this.http.get<Office>(this.endpoint + '/' + id);
    }

    createOffice(office: Office): Observable<Office> {
        let body = JSON.stringify(office);
        return this.http.post<Office>(this.endpoint, body, httpOptions);
    }

    updateOffice(id: number, office: Office): Observable<Office> {
        let body = JSON.stringify(office);
        return this.http.put<Office>(this.endpoint + '/' + id, body, httpOptions);
    }

    deleteOffice(id): Observable<Office> {
        return this.http.delete<Office>(this.endpoint + '/' + id);
    }
}
