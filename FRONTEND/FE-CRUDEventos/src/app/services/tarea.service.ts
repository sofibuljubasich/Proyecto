import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Tarea';

  getTasks(id: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.myAppUrl}${this.myApiUrl}/evento/${id}`
    );
  }
  updateTask(task: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(
      `${this.myAppUrl}${this.myApiUrl}/${task.tareaID}`,
      task
    );
  }
}
