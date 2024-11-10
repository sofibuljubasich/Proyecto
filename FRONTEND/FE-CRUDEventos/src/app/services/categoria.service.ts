import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { CategoriaResponse, Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Categoria';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(
      `${this.myAppUrl}${this.myApiUrl}`
    );
  }

  getCategoria(id: number): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`
    );
  }

  createCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, categoria);
  }

  updateCategoria(id: number, categoria: Categoria) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, categoria, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    throw new Error('Error en la solicitud HTTP.');
  }
}
