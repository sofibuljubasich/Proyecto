import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Tipo } from '../interfaces/evento';

@Injectable({
  providedIn: 'root',
})
export class TipoEventoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/TipoEvento/';

  constructor(private http: HttpClient) {}
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
