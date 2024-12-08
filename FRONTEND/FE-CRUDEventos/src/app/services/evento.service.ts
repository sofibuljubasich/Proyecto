import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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
      `${this.myAppUrl}${this.myApiUrl}resultados/${id}`
    );
  }
  getInscriptos(id: number): Observable<Inscrito[]> {
    return this.http.get<Inscrito[]>(
      `${this.myAppUrl}${this.myApiUrl}inscriptos/${id}`
    );
  }
  updateEstado(eventoID: number, estado: boolean) {
    console.log(estado);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(
      `${this.myAppUrl}${this.myApiUrl}UpdateEstado/${eventoID}?estado=${estado}`,
      {},
      { headers }
    );
  }

  createEvento(evento: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, evento);
  }

  // Actualizar un evento existente
  updateEvento(id: number, evento: any) {
    return this.http.put(
      `${this.myAppUrl}${this.myApiUrl}Update/${id}`,
      evento,
    );
  }
  updateImagen(id: number, imagen: File) {
    const formData = new FormData();
    formData.append('imagen',imagen);
    formData.append('eventoID', id.toString());
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}UploadImage`,
      formData
    );
  }
  descargar(eventoID: number): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}${this.myApiUrl}KitsExportarExcel/${eventoID}`,
      { responseType: 'blob' }
    );
  }
  cargarResultados(eventoID: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}CargarResultados/${eventoID}`,
      formData
    );
  }

  // Eliminar un evento por su ID
  deleteEvento(eventoId: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${eventoId}`);
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    throw new Error('Error en la solicitud HTTP.');
  }

  getLugares(): Observable<string[]> {
    return this.http.get<string[]>(`${this.myAppUrl}${this.myApiUrl}Lugares`);
  }
  enviarEmail(
    eventoID: number,
    asunto: string,
    mensaje: string
  ): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}EnviarEmail/${eventoID}`,
      null,
      {
        params: { asunto, mensaje },
        responseType: 'text' as 'json',
      }
    );
  }
  buscar(filtros: Busqueda): Observable<any[]> {
    let params = new HttpParams();
    if (filtros.texto) {
      params = params.set('busqueda', filtros.texto);
    }
    if (filtros.fechaIni) {
      params = params.set('fechaInicio', filtros.fechaIni);
    }
    if (filtros.fechaFin) {
      params = params.set('fechaFin', filtros.fechaFin);
    }
    if (filtros.tipoEvento) {
      params = params.set('tipo', filtros.tipoEvento);
    }
    //  if (filtros.texto){
    //    params=params.set('lugar',filtros.lugar);
    //  }
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}Filtrar`, {
      params,
    });
  }
}
