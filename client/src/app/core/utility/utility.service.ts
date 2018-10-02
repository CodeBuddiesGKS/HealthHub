import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private router: Router) { }

    public reroute(path: string, options?: any) {
        if (options) {
            this.router.navigate([path], options);
        } else {
            this.router.navigateByUrl(path);
        }
    }
}
