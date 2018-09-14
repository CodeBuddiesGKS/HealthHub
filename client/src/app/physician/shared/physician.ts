import { Gender } from "./gender";

export class Physician {
    constructor() {
        this.id = null;
        this.officeId = null;
        this.firstName = "";
        this.lastName = "";
        this.employmentDate = "";
        this.email = "";
        this.phone = "";
        this.gender = null;
    }
    id: number;
    officeId: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    email: string;
    phone: string;
    gender: Gender;
}