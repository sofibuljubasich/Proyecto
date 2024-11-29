import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class CorredorService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Corredor';

  getCorredorByDni(dni: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/${dni}`);
  }
  getCorredor(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.myAppUrl}${this.myApiUrl}/GetCorredor/${id}`
    );
  }
  verificarDni(dni: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.myAppUrl}${this.myApiUrl}/existe/${dni}`
    );
  }
  getUserAge(currentUser: Usuario): number | null {
    console.log('fechaNac', currentUser.fechaNacimiento);
    if (currentUser && currentUser.fechaNacimiento) {
      const birthdate = new Date(currentUser.fechaNacimiento);
      console.log('birthday', birthdate);
      const ageDifMs = Date.now() - birthdate.getTime();
      console.log('agedif ms', ageDifMs);
      const ageDate = new Date(ageDifMs);
      console.log('agedif ms', ageDate.getUTCFullYear());
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
  }
}
