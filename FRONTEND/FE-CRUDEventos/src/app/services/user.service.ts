import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { General, Usuario, UsuarioEnviado } from '../interfaces/usuario';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Usuario';

  // agregarUsuarios(userData: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(
  //     `${this.myAppUrl}${this.myApiUrl}`,
  //     userData
  //   );
  // }
  agregarUsuarios(userData:FormData) {
    
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/register`,
      userData,
    );
  }
  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  updateRol(usuarioID: number, rolID: number): Observable<any> {
    
    return this.http.patch(`${this.myAppUrl}${this.myApiUrl}/UpdateRol?usuarioID=${usuarioID}&rolID=${rolID}`, {});
  }

  // getUserAge(currentUser: Usuario): number | null {
  //   console.log('fechaNac', currentUser.fechaNacimiento);
  //   if (currentUser && currentUser.fechaNacimiento) {
  //     const birthdate = new Date(currentUser.fechaNacimiento);
  //     console.log(birthdate);
  //     const ageDifMs = Date.now() - birthdate.getTime();
  //     console.log(ageDifMs);
  //     const ageDate = new Date(ageDifMs);
  //     console.log(ageDifMs);
  //     return Math.abs(ageDate.getUTCFullYear() - 1970);
  //   }
  //   return null;
  // }
  getUserAge(currentUser: Usuario): number | null {
    // console.log('fechaNac', currentUser.fechaNacimiento);
    if (currentUser) {
      const birthdate = new Date('2000-12-11 00:00:00.0000000');

      const ageDifMs = Date.now() - birthdate.getTime();

      const ageDate = new Date(ageDifMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
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
