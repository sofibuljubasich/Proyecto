import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaVoluntarioService } from 'src/app/services/tarea-voluntario.service';
import { TareaService } from 'src/app/services/tarea.service';

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
  // dataSource: MatTableDataSource<Tarea> = new MatTableDataSource(TASK_DATA);
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _taskService: TareaService,
    private _tvService: TareaVoluntarioService,
    private aRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private location: Location
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._taskService.getTasks(this.id).subscribe((tasks: Tarea[]) => {
      console.log(tasks);
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openComment(comment: any): void {
    if (comment) {
      console.log('Comentario recibido:', comment);
    } else {
      console.log('No hay comentario');
    }
  }

  goBack(): void {
    this.location.back();
  }
  getTareaVoluntarioEstado(tareaID: number, volId: number): string {
    let estado = 'Cargando...'; // Mensaje por defecto mientras se obtiene el estado

    this._tvService.getTV(tareaID, volId.toString()).subscribe({
      next: (data) => {
        if (data) {
          estado = data.estado; // Asume que solo hay un registro por tarea y voluntario
        } else {
          estado = 'Sin estado';
        }
      },
      error: () => {
        estado = 'Error al cargar estado';
      },
    });

    return estado;
  }
}
