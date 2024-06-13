import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Auth/';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/register`,
      userData
    );
  }
}
