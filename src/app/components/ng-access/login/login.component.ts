import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInModel } from 'src/app/models/ng-access/login.model';
import { AuthorizationService } from '../../../services/ng-access/auth.service';
import { SAPB1Service } from 'src/app/services/ng-data/sapb1.service';
import { CookiesService } from '../../../services/ng-global/cookies.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService, AuthorizationService, CookiesService, SAPB1Service ]
})
export class LoginComponent implements OnInit {
  public logIn: LogInModel;
  public loading = false;
  public businessPartner: any = [];
  public errorMessage: string;

  constructor(
    private router: Router,
    private auth: AuthorizationService,
    private cookie: CookiesService,
    private sapb1: SAPB1Service,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    localStorage.clear();
    this.logIn = new LogInModel(null, null);
  }

  onSubmit(form): void {
    this.loading = true;
    this.postLogIn(this.logIn);
  }

  postLogIn(body: LogInModel): void {
    this.auth.postLogIn(body).subscribe(
      response => {
        if (response) {
          if (response.Success === true) {
            this.cookie.setCookie_auth(response.Token);
            this.cookie.setCookie_user(response.CardCode);

            this.getBPInfo();
          }
          else {
            this.loading = false;
            this.showError('El usuario o la contraseña son incorrectos.');
          }
        }
        else {
          this.loading = false;
          this.showError('Ocurrio un problema con el inicio de sesión.');
        }
      },
      error => {
        this.loading = false;
        this.showError(error.error);
      }
    );
  }

  getBPInfo(): void {
    this.sapb1.getBPInfo(this.cookie.getCookie_user()).subscribe(
      response => {
        if (response) {
          if (response.Success === true) {
            this.businessPartner = response.ObjectResult;
            const paramObj = {
              cardcode: this.businessPartner[0].CardCode,
              cardname: this.businessPartner[0].CardName,
              aliasname: this.businessPartner[0].AliasName
            };
            this.cookie.setCookie_param(paramObj);

            this.router.navigate(['/dashboard']);
          }
        }
      },
      error => { console.log(error as any); }
    );
  }

  showError(message: any): void {
    this.messageService.add({key: 'error', severity: 'error', summary: 'Error', detail: message});
  }

}
