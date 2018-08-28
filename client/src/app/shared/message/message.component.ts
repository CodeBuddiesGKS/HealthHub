import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material'

import { MessageService } from '../../core/message.service';

import { StatusMessageComponent } from './status-message/status-message.component';

import { NotificationMessage } from '../../core/models/notification-message';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

    constructor(private messageService: MessageService,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.messageService.message.subscribe((nm: NotificationMessage) => {
            this.snackBar.openFromComponent(StatusMessageComponent, {
                data: {
                    type: nm.type,
                    message: nm.message,
                    action: 'OK'
                },
                duration: 5000,
                panelClass: ['spread']
            });
        });
    }
}
