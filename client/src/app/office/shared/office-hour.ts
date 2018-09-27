export class OfficeHour {
    constructor(day: number) {
        this.id = null;
        this.officeId = null;
        this.day = day;
    }
    id: number;
    closeTime: string;
    day: number;
    officeId: number;
    openTime: string;
}