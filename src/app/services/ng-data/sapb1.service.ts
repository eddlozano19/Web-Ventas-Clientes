import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../ng-global/global';
import { CookiesService } from '../ng-global/cookies.service';


@Injectable()
export class SAPB1Service {
    public urlapi: string;
    public url: string;
    public token: string;

    constructor(
        private httpC: HttpClient,
        private cookie: CookiesService
    ){
        this.urlapi = Global.urlApilocal;
    }


    postExecuteSQL(body: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
        const paramBody = JSON.stringify(body);

        return this.httpC.post(this.urlapi + 'DataRetrieve/ExecuteRecordSet', paramBody, { headers });
    }


    getBPInfo(cardcode: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetBPInfoSQL/' + cardcode, { headers });
    }

    getInvoicesOpenSQL(cardcode: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetInvoicesOpenSQL/' + cardcode, { headers });
    }

    getInvoicesPaymentSQL(cardcode: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetInvoicesPaymentSQL/' + cardcode, { headers });
    }

    getItemMostSaleSQL(cardcode: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetItemMostSaleSQL/' + cardcode, { headers });
    }


    getAntiguedadSQL(cardcode: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetAntiguedadSQL/' + cardcode, { headers });
    }
    getEdoCuentaSQL(cardcode: any, docdate1: any, docdate2: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetEdoCuentaSQL/' + cardcode + '/' + docdate1 + '/' + docdate2, { headers });
    }
    getFacturasPagadasSQL(cardcode: any, docdate1: any, docdate2: any): Observable<any> {
        this.token = 'Bearer ' + this.cookie.getCookie_auth();
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

        return this.httpC.get(this.urlapi + 'DataRetrieve/GetFacturasPagadasSQL/' + cardcode + '/' + docdate1 + '/' + docdate2, { headers });
    }



    exampleRedFileText(): any {
        fetch('assets/querys/facturas_pagadas.txt')
            .then(response => response.text())
            .then(data => {
                return data;
            }
        );
    }

}
