import { OfficeHour } from "./office-hour";

export class Office {
    id: number;
    title: string;
    phone: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    zipcode: number;
    hours: OfficeHour[];
}
