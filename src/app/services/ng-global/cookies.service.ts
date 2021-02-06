import * as Cookies from 'js-cookie';
import { Injectable } from '@angular/core';

@Injectable()
export class CookiesService {
    constructor(){
    }

    removeCookies(): void {
        Cookies.remove('8a44-auth');
        Cookies.remove('8a44-user');
        Cookies.remove('8a44-param');
    }

    setCookie_auth(data: any): void {
        Cookies.set('8a44-auth', data, { expires: 4 });
    }
    setCookie_user(data: any): void {
        Cookies.set('8a44-user', data, { expires: 4 });
    }
    setCookie_param(data: any): void {
        Cookies.set('8a44-param', data, { expires: 4 });
    }


    getCookie_auth(): string {
        return Cookies.get('8a44-auth');
    }
    getCookie_user(): any {
        return Cookies.get('8a44-user');
    }
    getCookie_param(): any {
        return Cookies.get('8a44-param');
    }
}
