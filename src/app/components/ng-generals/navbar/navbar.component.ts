import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: []
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { this.router.navigate(['/dashboard']); }
      },
      {
        label: 'Informes',  icon: 'pi pi-fw pi-chart-line',
        items: [
          {label: 'Estado de cuenta', icon: 'pi pi-fw pi-list', command: () => { this.router.navigate(['/edocuenta']); } },
          {label: 'Antigüedad de saldo', icon: 'pi pi-fw pi-list', command: () => { this.router.navigate(['/cartera']); } },
          {separator: true},
          {label: 'Facturas pagadas', icon: 'pi pi-fw pi-list', command: () => { this.router.navigate(['/facturaspagadas']); } },
        ]
      },
      {
        label: 'Salir', icon: 'pi pi-fw pi-power-off', command: () => { this.router.navigate(['/logout']); }
      }
    ];
  }

}
