import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, EventoResponse } from '../interfaces/evento';
import { TablaResultados } from '../interfaces/tabla';
import { Busqueda } from '../interfaces/busqueda';
import { Inscrito } from '../interfaces/usuario';

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
  getEvento(id: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(
      `${this.myAppUrl}${this.myApiUrl}${id}`
    );
  }
  getResultados(id: number): Observable<TablaResultados[]> {
    return this.http.get<TablaResultados[]>(
      `${this.myAppUrl}${this.myApiUrl}$resultados/${id}`
    );
  }
  getInscriptos(id: number): Observable<Inscrito[]> {
    return this.http.get<Inscrito[]>(
      `${this.myAppUrl}${this.myApiUrl}inscriptos/${id}`
    );
  }

  // buscar(filtros: Busqueda): Observable<any>{
  //   let params = new HttpParams();
  //   if (filtros.texto) {
  //     params = params.set('busqueda', filtros.texto);
  //   }
  //   if (filtros.fechaIni) {
  //     params = params.set('fechaInicio', filtros.fechaIni);
  //   }
  //   if (filtros.fechaFin) {
  //     params = params.set('fechaFin', filtros.fechaFin);
  //   }
  //   if (filtros.tipoEvento) {
  //     params = params.set('tipo', filtros.tipoEvento);
  //   }
  //   if (filtros.lugar) {
  //     params = params.set('lugar', filtros.lugar);
  //   }
  //  return this.http.get(`${this.myAppUrl}${this.myApiUrl}$busqueda`,{filtros});
  //  }
  getLugares(): Observable<string[]> {
    return this.http.get<string[]>(`${this.myAppUrl}${this.myApiUrl}Lugares`);
  }
}
