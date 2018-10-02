import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public name: string = 'Gavin';
    public tabs: any[] = [
        {label: "Patient", path: "/patient"},
        {label: "Billing", path: "/billing"},
        {label: "Scheduler", path: "/scheduler"},
        {label: "Office Manager", path: "/office"},
        {label: "Physician Directory", path: "/physician"},
    ];

    constructor() { }

    ngOnInit() {
    }
}
