import { Component, OnInit } from '@angular/core';
import { SAPB1Service } from 'src/app/services/ng-data/sapb1.service';
import { CookiesService } from 'src/app/services/ng-global/cookies.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-facturaspagadas',
  templateUrl: './facturaspagadas.component.html',
  styleUrls: ['./facturaspagadas.component.css'],
  providers: [ SAPB1Service, CookiesService ]
})
export class FacturaspagadasComponent implements OnInit {
  public businessPartner: any;
  public loading = false;
  public facturasPagadas: any [];
  public sumPagado: number;
  public rowGroupMetadata: any;
  public docDate1: any;
  public docDate2: any;


  constructor(
    private cookie: CookiesService,
    private sapb1: SAPB1Service
  ) { }

  ngOnInit(): void {
    const baseDate = new Date();
    const firstDate = baseDate.getFullYear() + '-' + (baseDate.getMonth() + 1) + '-01';
    this.docDate1 = formatDate(firstDate, 'yyyy-MM-dd', 'en-US');
    this.docDate2 = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    this.getFacturasPagadasSQL();
  }

  onClickBuscarFechas(): void {
    this.facturasPagadas = null;
    this.sumPagado = 0;
    this.getFacturasPagadasSQL();
  }

  getFacturasPagadasSQL(): void {
    this.loading = true;

    this.sapb1.getFacturasPagadasSQL(this.cookie.getCookie_user(), 
        formatDate(this.docDate1, 'yyyy-MM-dd', 'en-US'), formatDate(this.docDate2, 'yyyy-MM-dd', 'en-US')).subscribe(
      response => {
        if (response) {
          this.facturasPagadas = response.ObjectResult;

          this.calculateImportes();
          this.updateRowGroupMetaData();

          this.loading = false;
        }
      },
      error => { console.log(error as any); this.loading = false; }
    );
  }

  onSort(): void {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData(): void {
    this.rowGroupMetadata = {};
    if (this.facturasPagadas) {
      for (let i = 0; i < this.facturasPagadas.length; i++) {
        const rowData = this.facturasPagadas[i];
        const representativeName = rowData.FolioPago;
        if (i === 0) {
            this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          const previousRowData = this.facturasPagadas[i - 1];
          const previousRowGroup = previousRowData.FolioPago;

          if (representativeName === previousRowGroup) {
              this.rowGroupMetadata[representativeName].size++;
          }
          else {
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  calculateImportes(): void {
    let total = 0;
    for (const importe of this.facturasPagadas) { total += Number(importe.MontoPagado); }
    this.sumPagado = total;
  }

}
