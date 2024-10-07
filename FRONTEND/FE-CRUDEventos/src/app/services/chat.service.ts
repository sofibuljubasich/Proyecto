import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Comentario';

  constructor(private http: HttpClient) {}

  getChats(usuarioID: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}Chats?usuarioID=${usuarioID}`);
  }

  getMensajes(usuarioID: number, otroID: number): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}Mensajes?usuarioID=${usuarioID}&otroID=${otroID}`
    );
  }

  sendMensaje(mensaje: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}NuevoMensaje`, mensaje);
  }
}
