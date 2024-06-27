import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Usuario/register';

  // agregarUsuarios(userData: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(
  //     `${this.myAppUrl}${this.myApiUrl}`,
  //     userData
  //   );
  // }
  agregarUsuarios(userData: Usuario) {
    this.http
      .post<Usuario>(`${this.myAppUrl}${this.myApiUrl}`, userData)
      .subscribe(
        (response) => {
          console.log('User registered successfully', response);
          //this.router.navigate(['/login']); // Redirigir al login después del registro exitoso
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
  }
}
