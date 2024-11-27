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
  nombreEvento!: string;
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
  commentVisible = false; // Controla si la burbuja se debe mostrar
  currentComment: string | null = null; // Almacena el comentario actual
  currentID: number | null = null; // Almacena el comentario actual

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
    this.aRoute.queryParams.subscribe((params) => {
      this.nombreEvento = params['nombre'] || 'Evento Desconocido'; // Valor por defecto
    });
  }

  ngOnInit(): void {
    this._taskService.getTasks(this.id).subscribe((tasks: Tarea[]) => {
      console.log(tasks);
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // openComment(comment: any, id: any): void {
  //   console.log(id, comment);
  //   if (this.currentID === id) {
  //     // Si el comentario es el mismo que ya está visible, cerramos la burbuja
  //     this.commentVisible = !this.commentVisible;
  //   } else {
  //     this.currentComment = comment || null;
  //     this.currentID = id;
  //     this.commentVisible = true;
  //   }
  // }
  visibleComments: { [key: string]: string } = {};

  private generateKey(tareaID: number, voluntarioID: number): string {
    return `${tareaID}-${voluntarioID}`;
  }

  // Alterna la visibilidad del comentario
  toggleComment(
    tareaID: number,
    voluntarioID: number,
    comentario: string | null
  ): void {
    const key = this.generateKey(tareaID, voluntarioID);

    if (this.visibleComments[key]) {
      // Si ya está visible, lo ocultamos
      delete this.visibleComments[key];
    } else {
      // Si no está visible, lo mostramos con el comentario correspondiente
      this.visibleComments[key] = comentario || 'No hay comentario';
    }
  }

  // Verifica si un comentario es visible
  isCommentVisible(tareaID: number, voluntarioID: number): boolean {
    const key = this.generateKey(tareaID, voluntarioID);
    return !!this.visibleComments[key];
  }

  // Obtiene el comentario asociado a una tarea-voluntario
  getComment(tareaID: number, voluntarioID: number): string {
    const key = this.generateKey(tareaID, voluntarioID);
    return this.visibleComments[key] || 'No hay comentario';
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
