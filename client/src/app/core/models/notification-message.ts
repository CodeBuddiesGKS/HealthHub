
export class NotificationMessage {
    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }
    message: string;
    type: string;    // success, error
}