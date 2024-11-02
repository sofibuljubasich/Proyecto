import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from '../environments/environment';
import { CategoriaResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
 
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Evento/';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCategoria(id: number): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(
      `${this.myAppUrl}${this.myApiUrl}${id}`
    );
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}`, categoria);
  }

  updateCategoria(id: number, categoria: Categoria) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Categoria>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      categoria,
      { headers, responseType: 'text' as 'json' }
    );
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

    // Manejo de errores
    private handleError(error: any): Observable<never> {
      console.error('Ocurrió un error:', error);
      throw new Error('Error en la solicitud HTTP.');
    }
}
