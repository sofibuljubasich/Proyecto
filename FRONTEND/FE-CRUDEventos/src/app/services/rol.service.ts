import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Rol/';

  constructor(private http: HttpClient) {}
  getRol(id: string): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
