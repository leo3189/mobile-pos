import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
;

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  private url: string = "";
  private END_POINT = 'User/Login';
  private companyID: string;

  constructor(public http: Http) {
  }

  getCompanyID(): string {
    return this.companyID;
  }

  setCompanyID(id: string) {
    this.companyID = id;
  }

  login(data) {
    return this.http.post(this.url + '/' + this.END_POINT, data)
    .map((response: Response) => {
        let user = response.json();
        return user;
    })  
    
  }

}
