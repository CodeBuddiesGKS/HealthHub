
export class Patient {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    zipcode: number;
}

export const PATIENTS: Patient[] = [
    {
        id: 1,
        firstName: "Mike",
        lastName: "Jefferson",
        birthDate: "01/01/2001",
        email: "mj@email.com",
        phone: "123-123-1234",
        address1: "123 Tornado St.",
        address2: "Apt. 1",
        address3: "P.O. Box #321",
        city: "Dustville",
        state: "NM",
        zipcode: 12345
    },
    {
        id: 2,
        firstName: "Janet",
        lastName: "Jefferson",
        birthDate: "01/01/2002",
        email: "mj@email.com",
        phone: "123-123-1234",
        address1: "123 Tornado St.",
        address2: "Apt. 1",
        address3: "P.O. Box #321",
        city: "Dustville",
        state: "NM",
        zipcode: 12345
    },
    {
        id: 3,
        firstName: "Tito",
        lastName: "Jefferson",
        birthDate: "01/01/2000",
        email: "mj@email.com",
        phone: "123-123-1234",
        address1: "123 Tornado St.",
        address2: "Apt. 1",
        address3: "P.O. Box #321",
        city: "Dustville",
        state: "NM",
        zipcode: 12345
    }
];