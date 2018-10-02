import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public activeTab: number = 0;

    constructor(private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        //this.activeTab = +this.route.snapshot.paramMap.get('activeTab');
        this.route.queryParams.subscribe(params => {
            this.activeTab = +params.activeTab;
        });
        // this.router.events.forEach(e => {
        //     if (e instanceof NavigationStart) {
        //         this.route.queryParams.subscribe(params => {
        //             this.activeTab = params.activeTab;
        //         });
        //     }
        // });
    }
}
