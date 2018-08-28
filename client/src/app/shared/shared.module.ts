import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { MessageComponent } from './message/message.component';
import { StatusMessageComponent } from './message/status-message/status-message.component';


// This module is used to store common components, pipes, and directives needed across the whole app
@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    declarations: [
        MessageComponent,
        StatusMessageComponent
    ],
    exports: [
        FlexLayoutModule,
        
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,

        MessageComponent
    ],
    entryComponents: [
        StatusMessageComponent
    ]
})
export class SharedModule { }