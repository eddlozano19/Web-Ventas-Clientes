import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard as AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/ng-access/login/login.component';
import { LogoutComponent } from './components/ng-access/logout/logout.component';
import { DashboardComponent } from './components/ng-generals/dashboard/dashboard.component';
import { CarteraComponent } from './components/ng-informes/cartera/cartera.component';
import { EdocuentaComponent } from './components/ng-informes/edocuenta/edocuenta.component';
import { FacturaspagadasComponent } from './components/ng-informes/facturaspagadas/facturaspagadas.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cartera', component: CarteraComponent, canActivate: [AuthGuard] },
  { path: 'edocuenta', component: EdocuentaComponent, canActivate: [AuthGuard] },
  { path: 'facturaspagadas', component: FacturaspagadasComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
