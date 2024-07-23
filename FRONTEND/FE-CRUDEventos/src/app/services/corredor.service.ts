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

  getCorredor(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  getUserAge(currentUser: Usuario): number | null {
    console.log('fechaNac', currentUser.fechaNacimiento);
    if (currentUser && currentUser.fechaNacimiento) {
      const birthdate = new Date(currentUser.fechaNacimiento);

      const ageDifMs = Date.now() - birthdate.getTime();

      const ageDate = new Date(ageDifMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
  }
}
