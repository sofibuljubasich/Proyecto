import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CreateTarea, Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Tarea';

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  getTasks(id: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.myAppUrl}${this.myApiUrl}/evento/${id}`
    );
  }
  updateTask(id: number, task: any): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.myAppUrl}${this.myApiUrl}/${id}`, task);
  }
  createTarea(tarea: CreateTarea): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, tarea);
  }
  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}
