import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';


// This module is used to store common services needed across the whole app
// Also store models common to the whole app in the models folder here
@NgModule({
    imports: [ CommonModule ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
            ]
        }
    }
}