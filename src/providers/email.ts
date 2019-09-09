import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmailProvider {

    private url: string = "";

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
