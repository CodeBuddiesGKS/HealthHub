import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { BillingService } from './shared/billing.service';

import { BillingComponent } from './billing.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        BillingComponent
    ],
    exports: [
        BillingComponent
    ]
})
export class BillingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BillingModule,
            providers: [
                BillingService
            ]
        }
    }
}
