import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para que funcionen las peticiones http y ajax se importa los modulos   //<<<<<<<<<
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * SERVICES
 */
import { AuthGuard as AuthGuard } from './guards/auth.guard';
import { AuthorizationService } from './services/ng-access/auth.service';
import { CookiesService } from './services/ng-global/cookies.service';

/**
 * PRIME NG
 */
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {DataViewModule} from 'primeng/dataview';
import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';

import { LoginComponent } from './components/ng-access/login/login.component';
import { LogoutComponent } from './components/ng-access/logout/logout.component';
import { FooterComponent } from './components/ng-generals/footer/footer.component';
import { NavbarComponent } from './components/ng-generals/navbar/navbar.component';
import { DashboardComponent } from './components/ng-generals/dashboard/dashboard.component';
import { CarteraComponent } from './components/ng-informes/cartera/cartera.component';
import { EdocuentaComponent } from './components/ng-informes/edocuenta/edocuenta.component';
import { FacturaspagadasComponent } from './components/ng-informes/facturaspagadas/facturaspagadas.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    CarteraComponent,
    EdocuentaComponent,
    FacturaspagadasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ProgressSpinnerModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    MenubarModule,
    DataViewModule,
    ChartModule,
    TableModule,
    CalendarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    AuthorizationService,
    CookiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
