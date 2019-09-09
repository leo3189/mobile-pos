import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyProvider {

  private url: string = "";
  private END_POINT: string = 'Company';

  constructor(
      public http: Http, 
      public api: Api) {
  
  }

  getAllCompanies() {
    return this.api.get(this.END_POINT);
  }

  getCompaniesByGroupID(groupID) {
    return this.api.get(this.END_POINT + '/group/' + groupID);
  }

  companyRegister(companyRegister) {
    return this.http.post(this.url + '/' + this.END_POINT + '/' + 'register', companyRegister)
    .map((response: Response) => {
        let register = response.json();
        return register;
    })
  }

  activeAccount(id) {
    return this.http.put(this.url + '/CompanyAccount/AccountActive/' + id, null)
    .map((response: Response) => {
      let result = response.json();
      console.log("Active api", result);
      return result;
    })
  }

  addCompany(company) {
    return this.api.post(this.END_POINT, company);
  }

  updateCompany(company) {
    return this.api.put(this.END_POINT, company);
  }

  deleteCompany(company) {
    company.active = false;
    return this.updateCompany(company);
  }

 
}
