import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { PhysicianService } from './shared/physician.service';

import { PhysicianComponent } from './physician.component';
import { PhysicianDetailComponent } from './physician-detail/physician-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        PhysicianComponent,
        PhysicianDetailComponent
    ],
    exports: [
        PhysicianComponent,
        PhysicianDetailComponent
    ]
})
export class PhysicianModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PhysicianModule,
            providers: [
                PhysicianService
            ]
        }
    }
}
