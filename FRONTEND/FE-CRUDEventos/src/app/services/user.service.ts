import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Usuario/';

  agregarUsuarios(userData: FormData): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, userData);
  }
}
