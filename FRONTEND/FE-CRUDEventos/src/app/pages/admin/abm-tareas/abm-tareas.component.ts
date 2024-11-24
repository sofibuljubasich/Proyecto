import { Component, OnInit } from '@angular/core';
import { General } from 'src/app/interfaces/usuario';
import { VoluntarioService } from 'src/app/services/voluntario.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';
import { CreateTarea, Tarea, Voluntario } from 'src/app/interfaces/tarea';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abm-tareas',
  templateUrl: './abm-tareas.component.html',
  styleUrl: './abm-tareas.component.css',
})
export class AbmTareasComponent implements OnInit {
  voluntariosSeleccionados: number[] = [];
  tareaForm: FormGroup;
  voluntarios: Voluntario[] = [];
  eventoId: number;
  nombreEvento!: string;

  constructor(
    private _volService: VoluntarioService,
    private _location: Location,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _tareaService: TareaService
  ) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.tareaForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      voluntariosID: [[]],
    });
    this.aRoute.queryParams.subscribe((params) => {
      this.nombreEvento = params['nombre'] || 'Evento Desconocido'; // Valor por defecto
    });
  }

  ngOnInit() {
    this.obtenerVoluntarios();
  }
  toggleVoluntario(voluntarioID: number, checked: boolean): void {
    if (checked) {
      this.voluntariosSeleccionados.push(voluntarioID);
    } else {
      this.voluntariosSeleccionados = this.voluntariosSeleccionados.filter(
        (id) => id !== voluntarioID
      );
    }
    this.tareaForm
      .get('voluntariosID')
      ?.setValue(this.voluntariosSeleccionados);
    console.log('Voluntarios:', this.voluntariosSeleccionados);
  }
  private combineFechaHora(): Date {
    const fecha = this.tareaForm.get('fecha')?.value;
    const hora = this.tareaForm.get('hora')?.value;
    return new Date(`${fecha}T${hora}`);
  }
  obtenerVoluntarios(): void {
    this._volService.getVoluntarios().subscribe((data: General[]) => {
      this.voluntarios = data;
      console.log(this.voluntarios);
    });
  }
  goBack() {
    this._location.back();
  }
  onSubmit(): void {
    if (this.tareaForm.valid) {
      const tarea: CreateTarea = {
        ...this.tareaForm.value,
        fechaHora: this.combineFechaHora(),
        // estado:'Pendiente',
        eventoID: this.eventoId,
      };
      console.log('Tarea:', tarea);
      this._tareaService.createTarea(tarea).subscribe({
        next: (response) => {
          this.tareaForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la tarea', error);
          alert('Ocurrió un error al crear la tarea.');
        },
      });
    }
  }
}
