export class Appointment {
    constructor() {
        this.id = null;
        this.startDate = "";
        this.endDate = "";
        this.physicianId = null;
        this.patientId = null;
        this.description = "";
    }
    id: number;
    startDate: string;
    endDate: string;
    physicianId: number;
    patientId: number;
    description: string;
}
