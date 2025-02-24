import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DefaultBackendService } from '../service/default-backend.service';
import { CommonModule } from '@angular/common';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { jwtDecode } from "jwt-decode";
import { MatButtonModule } from '@angular/material/button';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';


type ProfileType = {
  name?: string;
  preferred_username?: string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, MatButtonModule],
  styleUrls: [],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  profile: ProfileType | undefined;
  responseBackend!: object;
  loginDisplay = false;

  // pacientes = [
  //   { nombre: 'Juan Pérez', alerta: true, vitales: 'FC: 80, PA: 120/80' },
  //   { nombre: 'María López', alerta: false, vitales: 'FC: 72, PA: 110/70' }
  // ];
  pacientes: any= [];

  constructor(private authService: MsalService,private http: HttpClient, private backendService: DefaultBackendService, private msalBroadcastService: MsalBroadcastService) {}


  llamarBackend(): void {
    // this.backendService.consumirBackend().subscribe(data => {
    //   this.pacientes = data;
    // });
  }
  ngOnInit() {
    this.msalBroadcastService.msalSubject$
          .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
          )
          .subscribe((result: EventMessage) => {
            console.log(result);
            const payload = result.payload as AuthenticationResult;
            this.authService.instance.setActiveAccount(payload.account);
          });

        this.msalBroadcastService.inProgress$
          .pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None)
          )
          .subscribe(() => {
            this.setLoginDisplay();
          });
    this.llamarBackend()
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  // getProfile(url: string) {
  //   // Obtener el token del localStorage
  //   const token = localStorage.getItem('jwt');

  //   if (token) {
  //     try {
  //       // Decodificar el token sin usar jwt-decode (usando la función decodeTokenBase64Url)
  //       const decodedToken: any = this.decodeTokenBase64Url(token);

  //       // Extraer los datos deseados
  //       this.profile = {
  //         name: decodedToken.name,
  //         preferred_username: decodedToken.preferred_username,
  //       };

  //       console.log('Perfil decodificado:', this.profile);
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //     }
  //   } else {
  //     console.error('No se encontró ningún token en el localStorage.');
  //   }
  // }

  // private decodeTokenBase64Url(token: string): any {
  //   try {
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
  //         .join('')
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     console.error('Error al decodificar el token:', error);
  //     return null;
  //   }
  // }

}
