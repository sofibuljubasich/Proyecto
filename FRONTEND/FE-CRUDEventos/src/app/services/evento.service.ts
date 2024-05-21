import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, EventoResponse } from '../interfaces/evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Evento/';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<EventoResponse[]> {
    return this.http.get<EventoResponse[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  agregarEvento(eventoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, eventoData);
  }
}
