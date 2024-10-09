import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/tarea.service';
import { TASK_DATA } from 'src/app/interfaces/dato';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommentFormComponent } from 'src/app/components/comment-form/comment-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css',
})
export class TareasAsignadasComponent {
  // tasks: Tarea[] = [];
  id: number;
  displayedColumns: string[] = [
    'estado',
    'descripcion',
    'fechaHora',
    'ubicacion',
    'comentario',
    'voluntarios',
    'chat',
  ];
  dataSource: MatTableDataSource<Tarea> = new MatTableDataSource(TASK_DATA);
  // dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    // private _taskService: TareaService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private bottomSheet: MatBottomSheet
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // this._taskService.getTasks(this.id).subscribe((tasks: Tarea[]) => {
    //   this.dataSource = new MatTableDataSource(tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTask(task: Tarea): void {
    task.estado = task.estado === 'Pendiente' ? 'Realizada' : 'Pendiente';
    // this._taskService.updateTask(task).subscribe();
  }

  openCommentForm(task: Tarea): void {
    const bottomSheetRef = this.bottomSheet.open(CommentFormComponent);

    bottomSheetRef.afterDismissed().subscribe((comment) => {
      if (comment) {
        console.log('Comentario recibido:', comment);
        // Aquí puedes manejar el comentario recibido, por ejemplo, enviarlo a un servidor.
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  openChat(task: Tarea): void {
    // Lógica para redirigir a la página de chat
  }
}
