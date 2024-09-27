import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Inscripcion';

  inscribir(inscripcionData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post(`${this.myAppUrl}${this.myApiUrl}`, inscripcionData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getInscxUsuario(idUsuario: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(
      `${this.myAppUrl}${this.myApiUrl}/${idUsuario}`
    );
  }

  acreditar(id: number, estado: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(
      `${this.myAppUrl}${this.myApiUrl}/acreditar/${id}`,
      estado,
      { headers, responseType: 'text' }
    );
  }
  // checkear el path y si es patch o put
  updateEstadoPago(id: number, estado: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(
      `${this.myAppUrl}${this.myApiUrl}/ActualizarPago/${id}`,
      JSON.stringify(estado), // Enviar el estado como un string
      { headers, responseType: 'text' }
    );
  }
  //   const body = JSON.stringify({ estado });
  //   console.log('Enviando JSON:', body);
  //   return this.http.patch(
  //     `${this.myAppUrl}${this.myApiUrl}/acreditar/${id}`,
  //     // // JSON.stringify({ estado }),
  //     body,
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );
  // }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 400) {
        if (error.error != '') {
          errorMessage = error.error;
        } else {
          errorMessage = 'Causa desconocida';
        }
      }
    }
    return throwError(errorMessage);
  }
}
