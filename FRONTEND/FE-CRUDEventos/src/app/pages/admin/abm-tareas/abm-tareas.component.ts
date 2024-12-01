import { Component, OnInit } from '@angular/core';
import { General } from 'src/app/interfaces/usuario';
import { VoluntarioService } from 'src/app/services/voluntario.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';
import { CreateTarea, Tarea, Voluntario } from 'src/app/interfaces/tarea';
import { ActivatedRoute } from '@angular/router';
import { TareaVoluntarioService } from 'src/app/services/tarea-voluntario.service';

@Component({
  selector: 'app-abm-tareas',
  templateUrl: './abm-tareas.component.html',
  styleUrl: './abm-tareas.component.css',
})
export class AbmTareasComponent implements OnInit {
  voluntariosSeleccionados: number[] = [];
  tareaForm: FormGroup;
  voluntarios: Voluntario[] = [];
  eventoId!: number;
  isEditMode: boolean = false; // Saber si estamos editando o creando
  tareaId: number | null = null; // ID de la tarea a editar, si aplica

  constructor(
    private _volService: VoluntarioService,
    private _location: Location,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _vtService: TareaVoluntarioService,
    private _tareaService: TareaService
  ) {
    this.tareaId = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.tareaForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      voluntariosID: [[]],
    });
    this.aRoute.paramMap.subscribe((params) => {
      const id = params.get('id'); // Obtener ID de la tarea si existe
      this.isEditMode = id !== null; // Si hay ID, estamos editando
      this.tareaId = id ? +id : null;

      if (this.isEditMode) {
        this.cargarTarea(this.tareaId!); // Cargar datos previos para editar
      }
    });
  }
  cargarTarea(id: number): void {
    this._tareaService.getTask(id).subscribe((data: any) => {
      const fechaHora = new Date(data.fechaHora);
      console.log(data.id, data.voluntarios);
      this.eventoId = data.eventoID;
      const mappedData = {
        descripcion: data.descripcion,
        fecha: fechaHora.toISOString().split('T')[0], // Convertimos a formato ISO y extraemos la fecha
        hora: fechaHora.toTimeString().slice(0, 5), // Extraemos la hora (hh:mm)
        ubicacion: data.ubicacion,
        voluntariosID: data.voluntarios.map((vol: any) => vol.id), // Solo los IDs de los voluntarios
      };
      console.log('mapped: ', mappedData);
      this.tareaForm.patchValue(mappedData);
    });
  }

  ngOnInit() {
    this.aRoute.queryParams.subscribe((params) => {
      this.eventoId = +params['id'];
    });
    this.obtenerVoluntarios();
  }
  toggleVoluntario(volId: number, isChecked: boolean): void {
    const voluntarios = this.tareaForm.get('voluntariosID')?.value || [];

    if (isChecked) {
      // Agregar voluntario si no está ya
      this.tareaForm.get('voluntariosID')?.setValue([...voluntarios, volId]);
    } else {
      // Quitar voluntario si está
      this.tareaForm
        .get('voluntariosID')
        ?.setValue(voluntarios.filter((id: number) => id !== volId));
    }
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
    console.log(this.eventoId);
    if (this.tareaForm.invalid) {
      return;
    }
    const tareaData = {
      descripcion: this.tareaForm.value.descripcion,
      fechaHora: new Date(
        `${this.tareaForm.value.fecha}T${this.tareaForm.value.hora}:00`
      ),
      ubicacion: this.tareaForm.value.ubicacion,
      eventoID: this.eventoId,
    };
    const tarea = {
      descripcion: this.tareaForm.value.descripcion,
      fechaHora: new Date(
        `${this.tareaForm.value.fecha}T${this.tareaForm.value.hora}:00`
      ),
      ubicacion: this.tareaForm.value.ubicacion,
      eventoID: this.eventoId,
      voluntariosID: this.tareaForm.value.voluntariosID,
    };

    tareaID: this.tareaId; // El ID de la tarea que estás editando
    if (this.isEditMode && this.tareaId) {
      this._tareaService
        .updateTask(this.tareaId, tareaData)
        .subscribe(() => {});
      this._vtService
        .updateVoluntarios(this.tareaId, this.tareaForm.value.voluntariosID)
        .subscribe(() => {
          this.goBack();
        });
    } else {
      this._tareaService.createTarea(tarea).subscribe({
        next: (response) => {
          this.goBack();
          // this.tareaForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la tarea', error);
          alert('Ocurrió un error al crear la tarea.');
        },
      });
    }
  }
}
