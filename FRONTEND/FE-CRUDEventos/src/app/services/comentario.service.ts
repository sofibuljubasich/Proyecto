import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Comentario, ComentarioNuevo } from '../interfaces/comentario';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Comentario';

  constructor(private http: HttpClient) {}
  getComentarios(idEvento: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(
      `${this.myAppUrl}${this.myApiUrl}?eventoId=${idEvento}`
    );
  }
  crearComentario(
    comentario: Partial<ComentarioNuevo>
  ): Observable<Comentario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Comentario>(`${this.myAppUrl}${this.myApiUrl}`, comentario)
      .pipe(catchError(this.handleError));
    // , {
    //   headers,
    //   responseType: 'text',
    // })
    // .pipe(
    //   map((response) => {
    //     return response;
    //   })
    // );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 400 && error.error.errors) {
        // Si hay errores de validación devueltos por el servidor
        errorMessage = Object.values(error.error.errors).join(', ');
      } else {
        // Otros errores del servidor
        errorMessage = error.error.message || JSON.stringify(error.error);
      }
    }
    return throwError(errorMessage);
  }
}
