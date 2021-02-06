import { Component, OnInit } from '@angular/core';
import { SAPB1Service } from 'src/app/services/ng-data/sapb1.service';
import { CookiesService } from 'src/app/services/ng-global/cookies.service';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'],
  providers: [ SAPB1Service, CookiesService ]
})
export class CarteraComponent implements OnInit {
  public businessPartner: any;
  public loading = false;
  public carteraCliente: any [];
  public sumSaldo: number;
  public sum30: number;
  public sum60: number;
  public sum90: number;
  public sum120: number;
  public sumMas: number;

  constructor(
    private cookie: CookiesService,
    private sapb1: SAPB1Service
  ) { }

  ngOnInit(): void {
    this.getAntiguedadSQL();
  }


  getAntiguedadSQL(): void {
    this.loading = true;
    this.sapb1.getAntiguedadSQL(this.cookie.getCookie_user()).subscribe(
      response => {
        if (response) {
          this.carteraCliente = response.ObjectResult;

          this.calculateSaldo();
          this.loading = false;
        }
      },
      error => { console.log(error as any); this.loading = false; }
    );
  }

  calculateSaldo(): void {
    let total = 0;
    let total30 = 0;
    let total60 = 0;
    let total90 = 0;
    let total120 = 0;
    let totalMas = 0;
    for (const cartera of this.carteraCliente) {
      total += Number(cartera.Saldo);
      total30 += Number(cartera.C_1_30);
      total60 += Number(cartera.C_31_60);
      total90 += Number(cartera.C_61_90);
      total120 += Number(cartera.C_91_120);
      totalMas += Number(cartera.C_121_mas);
    }
    this.sumSaldo = total;
    this.sum30 = total30;
    this.sum60 = total60;
    this.sum90 = total90;
    this.sum120 = total120;
    this.sumMas = totalMas;
  }

}
