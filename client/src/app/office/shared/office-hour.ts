export class OfficeHour {
    constructor(id: number, officeId: number, day: number) {
        this.id = id;
        this.officeId = officeId;
        this.day = day;
    }
    id: number;
    closeTime: string;
    day: number;
    officeId: number;
    openTime: string;
}