import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private route: ActivatedRoute,
                private router: Router) { }

    // Form Util
    public autocompleteDisplayEntity(entity: any, ...props: string[]) {
        return entity ? this.propsToStringBuilder(entity, props) : undefined;
    }
    
    // Form Util
    public autocompleteMatchControlValue(options: any[], control: FormControl, props: string[]) {
        if (typeof control.value === 'string') {
            let match = options.find(option => this.propsToStringBuilder(option, props, false) === control.value);
            if (match) control.setValue(match);
        }
    }
    
    // Form Util
    public autocompleteMatchValidator(options: any, ...props: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!options) return null;
            const isMatch = options.some(option => {
                let inputVal: string;
                if (typeof control.value === 'string') {
                    inputVal = control.value;
                } else {
                    inputVal = this.propsToStringBuilder(control.value, props);
                }
                let optionVal = this.propsToStringBuilder(option, props);
                return optionVal === inputVal;
            });
            return !isMatch ? { 'invalidMatch': { value: control.value } } : null;
        };
    }

    // Route Util
    public getQueryParams() {
        return this.route.snapshot.queryParams;
    }

    // Route Util
    public getRouteParam(name) {
        return this.route.firstChild.snapshot.paramMap.get(name);
    }

    // Form Util
    public filterAutocompleteDropdown(arr: any[], value: string, ...props: string[]): any[] {
        const searchTerm = value.toLowerCase();
        return arr.filter(option => {
            let searchString = this.propsToStringBuilder(option, props, false);
            return searchString.includes(searchTerm);
        });
    }

    // Form Util
    public formControlRequiredErrorValidation(control: FormControl) {
        return control.invalid 
            && (control.dirty || control.touched)
            && control.errors.required;
    }

    // Form Util
    public formControlAutocompleteMatchErrorValidation(control: FormControl) {
        return control.invalid 
            && (control.dirty || control.touched)
            && control.value != ''
            && control.errors.invalidMatch;
    }

    // Route Util
    public reroute(path: string, options?: any) {
        if (options) {
            this.router.navigate([path], options);
        } else {
            this.router.navigateByUrl(path);
        }
    }

    // Form Util
    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    // Form Util
    private propsToStringBuilder(entity: any, props: string[], isCaseSensitive: boolean = true) {
        let returnString: string = '';
        props.forEach(prop => {
            let part = isCaseSensitive ? entity[prop] : entity[prop].toLowerCase();
            returnString = returnString.concat(part, ' ');
        });
        return returnString.trim();
    }
}
