import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Tarea, Voluntario } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/tarea.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommentFormComponent } from 'src/app/components/comment-form/comment-form.component';
import { Location } from '@angular/common';
import { TareaVoluntarioService } from 'src/app/services/tarea-voluntario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css',
})
export class TareasAsignadasComponent {
  // tasks: Tarea[] = [];
  taskData = { tareaID: 0, voluntarioID: '', comentario: '' };
  taskData2 = { tareaID: 0, voluntarioID: '', estado: '' };
  id: number;
  volId!: string;
  displayedColumns: string[] = [
    'estado',
    'descripcion',
    'fecha',
    'hora',
    'ubicacion',
    'comentario',
    'voluntarios',
    'chat',
  ];
  // dataSource: MatTableDataSource<Tarea> = new MatTableDataSource(TASK_DATA);
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _taskService: TareaService,
    private _tvService: TareaVoluntarioService,
    private _authService: AuthService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private bottomSheet: MatBottomSheet
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this.volId = userId;
        this._tvService
          .getTasksxVoluntario(this.id, this.volId)
          .subscribe((tasks: Tarea[]) => {
            this.filtroVoluntarios1(tasks);
            console.log(tasks);

            this.dataSource = new MatTableDataSource(tasks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      }
    });
  }
  filtroVoluntarios1(tasks: Tarea[]) {
    return tasks.filter((task) =>
      task.tareaVoluntarios.some(
        (voluntario) => voluntario.voluntarioID === this.volId
      )
    );
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTask(task: Tarea): void {
    const voluntario = task.tareaVoluntarios.find(
      (v) => v.voluntarioID === this.volId
    );
    if (voluntario) {
      const nuevoEstado =
        voluntario.estado === 'Pendiente' ? 'Realizada' : 'Pendiente';
      voluntario.estado = nuevoEstado;
      this.taskData2.tareaID = this.id;
      this.taskData2.voluntarioID = this.volId;
      this.taskData2.estado = nuevoEstado;
      console.log(this.taskData2);
      this._tvService.updateEstado(this.taskData2).subscribe();
    }
  }

  openCommentForm(task: Tarea): void {
    const bottomSheetRef = this.bottomSheet.open(CommentFormComponent);
    console.log(task);
    bottomSheetRef.afterDismissed().subscribe((comment) => {
      if (comment) {
        console.log(comment);
        this.taskData.tareaID = task.id;
        this.taskData.voluntarioID = this.volId;
        this.taskData.comentario = comment;
        this._tvService.addComentario(this.taskData).subscribe();
        console.log('Comentario recibido:', this.taskData);
        // Aquí puedes manejar el comentario recibido, por ejemplo, enviarlo a un servidor.
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
