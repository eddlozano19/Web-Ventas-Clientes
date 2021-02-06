import { Component, OnInit } from '@angular/core';
import { SAPB1Service } from 'src/app/services/ng-data/sapb1.service';
import { CookiesService } from 'src/app/services/ng-global/cookies.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-edocuenta',
  templateUrl: './edocuenta.component.html',
  styleUrls: ['./edocuenta.component.css'],
  providers: [ SAPB1Service, CookiesService ]
})
export class EdocuentaComponent implements OnInit {
  public businessPartner: any;
  public saldoCliente: any [];
  public sumSaldo: number;
  public docDate1: any;
  public docDate2: any;
  public loading = false;


  constructor(
    private cookie: CookiesService,
    private sapb1: SAPB1Service
  ) { }

  ngOnInit(): void {
    this.businessPartner = JSON.parse(this.cookie.getCookie_param());

    const baseDate = new Date();
    const firstDate = baseDate.getFullYear() + '-' + (baseDate.getMonth() + 1) + '-01';

    this.docDate1 = formatDate(firstDate, 'yyyy-MM-dd', 'en-US');
    this.docDate2 = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    this.getEdoCuentaSQL();
  }

  onClickBuscarFechas(): void {
    this.saldoCliente = null;
    this.sumSaldo = 0;
    this.getEdoCuentaSQL();
  }


  getEdoCuentaSQL(): void {
    this.loading = true;
    this.sapb1.getEdoCuentaSQL(this.cookie.getCookie_user(), 
        formatDate(this.docDate1, 'yyyy-MM-dd', 'en-US'), formatDate(this.docDate2, 'yyyy-MM-dd', 'en-US')).subscribe(
      response => {
        if (response) {
          this.loading = false;
          this.saldoCliente = response.ObjectResult;

          this.calculateSaldo();
        }
      },
      error => {
        console.log(error as any);
        this.loading = false;
      }
    );

    // fetch('assets/querys/saldo_cuenta.txt')
    //   .then(response => response.text())
    //   .then(data => {
    //     queryModel.doQuery = data.replace('@CardCode', this.cookie.getCookie_user)
    //                             .replace('@DocDate1', formatDate(this.docDate1, 'yyyy-MM-dd', 'en-US'))
    //                             .replace('@DocDate2', formatDate(this.docDate2, 'yyyy-MM-dd', 'en-US'));

    //   }
    // );
  }

  calculateSaldo(): void {
    let total = 0;
    for (const importe of this.saldoCliente) { total += Number(importe.BalDueDeb); }
    this.sumSaldo = total;
  }


}
