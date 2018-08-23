import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from './test.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TestComponent
    ]
})
export class TestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TestModule,
            providers: [
            ]
        }
    }
}
