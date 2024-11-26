// src/app/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Para la URL base de la API
import { catchError } from 'rxjs/operators';  // Para el manejo de errores
import { ReporteEventoDTO, ReporteGlobalDTO } from '../interfaces/reporte'; // Asegúrate de tener estos interfaces correctamente definidos

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private myAppUrl: string = environment.endpoint; // Usamos el endpoint base de la API
  private myApiUrl: string = 'api/reportes/'; // Ruta de los reportes

  constructor(private http: HttpClient) {}

  // Obtener reporte de un evento específico
  obtenerReporteEvento(eventoID: number): Observable<ReporteEventoDTO> {
    return this.http.get<ReporteEventoDTO>(`${this.myAppUrl}${this.myApiUrl}evento/${eventoID}`).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener reporte global (todos los eventos)
 // obtenerReporteGlobal(): Observable<ReporteGlobalDTO> {
   // return this.http.get<ReporteGlobalDTO>(`${this.myAppUrl}${this.myApiUrl}global`).pipe(
     // catchError(this.handleError)  // Manejo de errores
   // );
  //}
  obtenerReporteGlobal(): Observable<ReporteGlobalDTO> {
    return this.http.get<ReporteGlobalDTO>(`${this.myAppUrl}${this.myApiUrl}global`);}
  // Manejo centralizado de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    throw new Error('Error en la solicitud HTTP.');
  }
}
