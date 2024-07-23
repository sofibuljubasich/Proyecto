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
  private myApiUrl: string = 'api/Usuario';

  // agregarUsuarios(userData: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(
  //     `${this.myAppUrl}${this.myApiUrl}`,
  //     userData
  //   );
  // }
  agregarUsuarios(userData: Usuario) {
    this.http
      .post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/$register`, userData)
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
  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
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
}
