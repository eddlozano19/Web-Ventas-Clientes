import { Component, OnInit } from '@angular/core';
import { SAPB1Service } from 'src/app/services/ng-data/sapb1.service';
import { CookiesService } from 'src/app/services/ng-global/cookies.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ SAPB1Service, CookiesService ]
})
export class DashboardComponent implements OnInit {
  public businessPartner: any;
  public invoices: any [];
  public payment: any [];
  public itemsSales: any [];
  public dataChart: any;

  constructor(
    private cookie: CookiesService,
    private sapb1: SAPB1Service
  ) { }

  ngOnInit(): void {
    this.businessPartner = JSON.parse(this.cookie.getCookie_param());
    this.getInvoicesOpenSQL();
  }

  getInvoicesOpenSQL(): void {
    this.sapb1.getInvoicesOpenSQL(this.cookie.getCookie_user()).subscribe(
      response => {
        if (response) {
          this.invoices = response.ObjectResult;

          this.getItemMostSaleSQL();
        }
      },
      error => { console.log(error as any); }
    );
  }

  getItemMostSaleSQL(): void {
    this.sapb1.getItemMostSaleSQL(this.cookie.getCookie_user()).subscribe(
      response => {
        if (response) {
          this.itemsSales = response.ObjectResult;

          this.getInvoicesPaymentSQL();
        }
      },
      error => { console.log(error as any); }
    );
  }

  getInvoicesPaymentSQL(): void {
    const arrayChartLabels = new Array();
    const arrayChart = new Array();

    this.sapb1.getInvoicesPaymentSQL(this.cookie.getCookie_user()).subscribe(
      response => {
        if (response) {
          this.payment = response.ObjectResult;
          this.payment.forEach(element => {
            arrayChartLabels.push(element.DocDate);
            arrayChart.push(Number(element.DocTotal));
          });

          this.dataChart = {
            labels: arrayChartLabels,
            datasets: [
              {
                label: 'Pagos Mensuales',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: arrayChart
              }
            ]
          };
        }
      },
      error => { console.log(error as any); }
    );
  }

}
