import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
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
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  public currentUser$: Observable<any | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      this.userIdSubject.next(savedUserId);
    }
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(userData: any): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/login`, userData, {
        headers,
      })
      .pipe(
        tap((response: Usuario) => this.setSession(response)),
        catchError(this.handleError)
      );
  }

  private setSession(user: Usuario): void {
    this.userIdSubject.next(JSON.stringify(user.id));
    localStorage.setItem('userId', JSON.stringify(user.id));
  }

  forgotPassword(email: string):Observable<string> {

    return this.http
      .post<string>(`${this.myAppUrl}${this.myApiUrl}/forgot-password?email=${encodeURIComponent(email)}`, null, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  resetPassword(userData:any):Observable<string> {

    return this.http
      .post<string>(`${this.myAppUrl}${this.myApiUrl}/reset-password`, userData, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }
  changePassword(email:string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/change-password`, { email, currentPassword, newPassword });
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

  register(formData: FormData) {
    return this.http
      .post(`${this.myAppUrl}${this.myApiUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
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
        errorMessage = error.error.message || 'Error desconocido';
      }
    }
    return throwError(() => new Error(errorMessage));
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
