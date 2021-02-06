import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/ng-global/cookies.service';
import { AuthorizationService } from '../services/ng-access/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookie: CookiesService,
    private auth: AuthorizationService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.cookie.getCookie_auth()) {
        return this.router.navigate(['/login']);
      }

      this.auth.postAuth(this.cookie.getCookie_auth()).subscribe(
        response => {
          console.log('¡authenticated!');
        },
        error => {
          console.log(error);
          return this.router.navigate(['/login']);
        }
      );
      return true;
  }

}
