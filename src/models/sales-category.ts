export class SalesCategory {
    id: number;
    name: string;
    companyID: string;

    constructor(name: string = '', companyID: string = '') {
        this.name = name;
        this.companyID = companyID;
    }
}