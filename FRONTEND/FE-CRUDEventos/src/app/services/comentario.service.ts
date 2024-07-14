import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comentario, ComentarioNuevo } from '../interfaces/comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Comentario';

  constructor(private http: HttpClient) {}
  getComentarios(idEvento: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(
      `${this.myAppUrl}${this.myApiUrl}?eventoId=${idEvento}`
    );
  }
  crearComentario(
    comentario: Partial<ComentarioNuevo>
  ): Observable<Comentario> {
    return this.http.post<Comentario>(
      `${this.myAppUrl}${this.myApiUrl}`,
      comentario
    );
  }
}
