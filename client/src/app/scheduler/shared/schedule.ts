import { Appointment } from "./appointment";
import { Patient } from "../../patient/shared/patient";
import { Physician } from "../../physician/shared/physician";

export class Schedule {
    constructor(person: Physician | Patient, isPatient: boolean) {
        this.appointments = [];
        this.isPatient = isPatient;
        this.person = person;
    }
    public appointments: Appointment[];
    public isPatient: boolean;
    public person: Physician | Patient;
}