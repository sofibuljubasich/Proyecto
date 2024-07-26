import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EventoResponse } from '../interfaces/evento';
import { Voluntario, VoluntarioNuevo } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class VoluntarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Voluntario';

  constructor(private http: HttpClient) {}

  getVoluntarios(): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  register(userData: VoluntarioNuevo): Observable<Voluntario> {
    return this.http.get<Voluntario>(
      `${this.myAppUrl}${this.myApiUrl}/register`
    );
  }
}
