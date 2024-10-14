import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
  register(userData: FormData) {
    return this.http
      .post<General>(`${this.myAppUrl}${this.myApiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
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
