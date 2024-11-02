import { environment } from '../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distancia, DistanciaResponse } from '../models/distancia';

@Injectable({
  providedIn: 'root'
})
export class DistanciaService {
    constructor(private http: HttpClient) {}
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Corredor';
  
    getDistancias(): Observable<DistanciaResponse[]> {
    return this.http.get<DistanciaResponse[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getDistancia(id: number): Observable<DistanciaResponse> {
    return this.http.get<DistanciaResponse>( `${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  createDistancia(distancia: Distancia): Observable<DistanciaResponse> {
    return this.http.post<Distancia>(`${this.myAppUrl}${this.myApiUrl}`, distancia );
  }

  updateDistancia(id:number,distancia: Distancia): Observable<DistanciaResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Distancia>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      distancia,
      { headers, responseType: 'text' as 'json' }
    );  }

  deleteDistancia(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
