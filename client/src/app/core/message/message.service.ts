import { Injectable, EventEmitter } from '@angular/core';

import { NotificationMessage } from '../models/notification-message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    public message: EventEmitter<NotificationMessage> = new EventEmitter<NotificationMessage>();

    constructor() { }

    success(message) {
        const nm = new NotificationMessage('success', message);
        this.message.emit(nm);
    }

    error(message) {
        const nm = new NotificationMessage('error', message);
        this.message.emit(nm);
    }
}
