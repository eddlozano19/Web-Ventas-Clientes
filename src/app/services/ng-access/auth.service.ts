import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInModel } from '../../models/ng-access/login.model';
import { Global } from '../ng-global/global';
import { CookiesService } from '../ng-global/cookies.service';


@Injectable()
export class AuthorizationService {
    public urlapi: string;
    public login: LogInModel;

    constructor(
        private httpC: HttpClient,
        private cookie: CookiesService
    ){
        this.urlapi = Global.urlApilocal;
    }

    postLogIn(body: LogInModel): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        const paramBody = JSON.stringify(body);
        return this.httpC.post(this.urlapi + 'auth/AuthBusinessPartnerSQL', paramBody, { headers });
    }

    postAuth(tokenId: any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', 'Bearer ' + this.cookie.getCookie_auth());

        const objeto = { token: tokenId };
        const paramBody = JSON.stringify(objeto);

        return this.httpC.post(this.urlapi + 'auth/authguard', paramBody, { headers });
    }

}
