import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
// import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Auth';
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public userId$: Observable<string | null> = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      this.userIdSubject.next(savedUserId);
    }
  }

  login(userData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.myAppUrl}${this.myApiUrl}/login`, userData, {
        headers,
        responseType: 'text',
      })
      .pipe(
        tap((response: string) => this.setSession(response)),
        catchError(this.handleError)
      );
  }

  private setSession(userId: string): void {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId);
  }

  logout(): void {
    this.userIdSubject.next(null);
    localStorage.removeItem('userId');
  }

  getUserId(): string | null {
    return this.userIdSubject.value;
  }

  isAuthenticated(): boolean {
    return this.userIdSubject.value !== null;
  }

  register(userData: Usuario) {
    return this.http
      .post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  getCurrentUser(): any {
    const userId = this.getUserId();
    if (userId) {
      return { id: userId }; // Devuelve un objeto de usuario con el ID
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

  getUserAge(): number | null {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.birthdate) {
      const birthdate = new Date(currentUser.birthdate);
      const ageDifMs = Date.now() - birthdate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
  }
}
