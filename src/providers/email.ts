import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmailProvider {

    private url: string = "http://3.17.144.10:8081/api";

    constructor(
        public http: Http) {
        

    }

    sendEmailApi(params) {
        return this.http.post(this.url, params)
            .map((response: Response) => {
                let email = response.json();
                return email;
        })
    }
    
}