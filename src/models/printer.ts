export class Printer {
    id: number;
    name: string;
    ipAddress: string;
    numberOfCopy: number;

    constructor(name: string = '', ipAddress: string = '', numberOfCopy: number = 1) {
        this.name = name;
        this.ipAddress = ipAddress;
        this.numberOfCopy = numberOfCopy;
    }
}