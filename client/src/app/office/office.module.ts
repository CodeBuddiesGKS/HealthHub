import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { OfficeService } from './shared/office.service';

import { OfficeComponent } from './office.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        OfficeComponent,
        OfficeDetailComponent
    ],
    exports: [
        OfficeComponent,
        OfficeDetailComponent
    ]
})
export class OfficeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: OfficeModule,
            providers: [
                OfficeService
            ]
        }
    }
}
