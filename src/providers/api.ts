import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoginProvider } from './login';


@Injectable()
export class Api {

  private url: string = '';
  private timeOut: number = 15000;
  private companyID: string;
    
  constructor(
    public http: Http,
    private login: LoginProvider) {
    
    
  }

  get(endpoint: string) {
    this.companyID = JSON.parse(localStorage.getItem('companyID'));

    const httpHeader = new Headers ({
        'accept': 'application/json',
        'company_id': this.companyID
      })
   
    return this.http.get(this.url + endpoint + this.companyID, {
      headers: httpHeader
    }).timeout(this.timeOut);   
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    this.companyID = JSON.parse(localStorage.getItem('companyID'));
    return this.http.post(this.url + '/' + this.companyID + '/' + endpoint, body, options).timeout(this.timeOut);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options).timeout(this.timeOut);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options).timeout(this.timeOut);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.patch(this.url + '/' + endpoint, body, options).timeout(this.timeOut);
  }
}


