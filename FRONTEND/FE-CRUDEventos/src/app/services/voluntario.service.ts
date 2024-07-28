import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EventoResponse } from '../interfaces/evento';
import { General, UsuarioEnviado } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class VoluntarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Voluntario';

  constructor(private http: HttpClient) {}

  getVoluntarios(): Observable<General[]> {
    return this.http.get<General[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  register(userData: UsuarioEnviado) {
    return this.http.post<General>(
      `${this.myAppUrl}${this.myApiUrl}/register`,
      userData
    );
  }
}
