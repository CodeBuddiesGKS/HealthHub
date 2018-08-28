import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-status-message',
    templateUrl: './status-message.component.html',
    styleUrls: ['./status-message.component.css']
})
export class StatusMessageComponent {

    constructor(
        private snackBarRef: MatSnackBarRef<StatusMessageComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) { }

    onAction() {
        this.snackBarRef.dismissWithAction();
    }
}
