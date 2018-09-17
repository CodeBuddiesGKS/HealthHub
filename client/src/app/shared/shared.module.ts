import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { FormControlAutocompleteComponent } from './form-control/form-control-autocomplete/form-control-autocomplete.component';
import { FormControlDatePickerComponent } from './form-control/form-control-date-picker/form-control-date-picker.component';
import { FormControlDatetimePickerComponent } from './form-control/form-control-datetime-picker/form-control-datetime-picker.component';
import { FormControlSelectComponent } from './form-control/form-control-select/form-control-select.component';
import { FormControlTextComponent } from './form-control/form-control-text/form-control-text.component';
import { FormControlTimePickerComponent } from './form-control/form-control-time-picker/form-control-time-picker.component';
import { MessageComponent } from './message/message.component';
import { StatusMessageComponent } from './message/status-message/status-message.component';


// This module is used to store common components, pipes, and directives needed across the whole app
@NgModule({
    imports: [
        CommonModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    declarations: [
        MessageComponent,
        StatusMessageComponent,
        FormControlAutocompleteComponent,
        FormControlDatePickerComponent,
        FormControlDatetimePickerComponent,
        FormControlSelectComponent,
        FormControlTextComponent,
        FormControlTimePickerComponent
    ],
    exports: [
        FlexLayoutModule,
        MessageComponent,
        
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule
    ],
    entryComponents: [
        StatusMessageComponent
    ]
})
export class SharedModule { }