import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoDistanciaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/EventoDistancia/';

  constructor(private http: HttpClient) {}
  updateEvento(id: number, ed: any) {
    return this.http.put(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      ed,
    );
  }
}
