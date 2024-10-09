import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommentFormComponent } from 'src/app/components/comment-form/comment-form.component';
import { TASK_DATA } from 'src/app/interfaces/dato';
import { Tarea } from 'src/app/interfaces/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
})
export class TareasComponent {
  id: number;
  displayedColumns: string[] = [
    'descripcion',
    'voluntarios',
    'chat',
    'estado',
    'comentario',
    'editar',
  ];
  dataSource: MatTableDataSource<Tarea> = new MatTableDataSource(TASK_DATA);
  // dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    // private _taskService: TareaService,
    private aRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private location: Location
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
