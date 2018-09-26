
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
    transform(array: any[], prop: string) {
        return array.filter(item => item[prop]);
    }
}