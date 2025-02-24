import { Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard],
  },
  // {
  //   path: 'bienvenido',
  //   component: BienvenidoComponent,
  //   canActivate: [MsalGuard],
  // },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-failed',
    component: FailedComponent,
  },
];
