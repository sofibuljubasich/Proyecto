import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Tarea, TareaVoluntarios, Voluntario } from '../interfaces/tarea';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root',
})
export class TareaVoluntarioService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/TareaVoluntario';

  getTV(tareaID: number, volId: string): Observable<TareaVoluntarios> {
    let params = new HttpParams();
    params = params.set('tareaID', tareaID);
    params = params.set('voluntarioID', volId);
    return this.http.get<TareaVoluntarios>(`${this.myAppUrl}${this.myApiUrl}`, {
      params,
    });
  }
  getEventosxVoluntario(volId: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(
      `${this.myAppUrl}${this.myApiUrl}/${volId}/eventos`
    );
  }
  getTasksxVoluntario(eventoID: number, volId: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.myAppUrl}${this.myApiUrl}/tareas/${eventoID}/${volId}`
    );
  }
  updateVoluntarios(tareaId: number, voluntariosId: number[]): Observable<any> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}/UpdateVoluntarios/${tareaId}`,
      voluntariosId
    );
  }
  getAllxVoluntario(volId: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.myAppUrl}${this.myApiUrl}/tareas/${volId}`
    );
  }
  updateEstado(taskData: any): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}/UpdateEstado`,
      taskData,
      { headers }
    );
  }
  addComentario(taskData: any): Observable<any> {
    return this.http.patch<any>(
      `${this.myAppUrl}${this.myApiUrl}/AddComentario`,
      taskData
    );
  }
  asignarTarea(taskId: number, listVolID: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/UpdateVoluntarios/${taskId}`,
      listVolID
    );
  }
  deleteTareaVoluntario(tareaID: number, volId: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('tareaID', tareaID);
    params = params.set('voluntarioID', volId);
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}`, { params });
  }
}
