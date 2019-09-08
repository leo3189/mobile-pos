import { Injectable } from '@angular/core';
import * as Net from 'net';

@Injectable()
export class PrinterProvider {

    constructor() {

    }

    connect(host: string, port: any) {
        return Net.connect(host, port);
    }

    
}