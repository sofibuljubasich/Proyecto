import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { Evento, EventoResponse, Tipo } from 'src/app/interfaces/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaResponse } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { DistanciaResponse } from 'src/app/interfaces/distancia';
import { DistanciaService } from 'src/app/services/distancia.service';

@Component({
  selector: 'app-agregar-editar-evento',
  templateUrl: './agregar-editar-evento.component.html',
  styleUrls: ['./agregar-editar-evento.component.css'],
})
export class AgregarEditarEventoComponent implements OnInit {
  eventoForm: FormGroup;
  isEditing: boolean = false;
  id: number;
  currentEvent!: EventoResponse;
  selectedFile?: File;
  selectedFileUrl: string | null = null;
  categorias: CategoriaResponse[] = [];
  tipos: Tipo[] = [];
  dist: DistanciaResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private distanciaService: DistanciaService,
    private categoriaService: CategoriaService,
    private location: Location,
    private _tipoService: TipoEventoService,
    private datePipe: DatePipe
  ) {
    this.eventoForm = this.fb.group({
      nombre: [''],
      fecha: [''],
      lugar: [''],
      tipo: [''],
      hora: ['17:00'],
      imagen: [''],
      estado: [''],
      eventoDistancias: this.fb.array([]),
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.getDist();
    this.obtenerTipo();
  }
  selectTipo(tipo: string) {
    this.eventoForm.get('tipo')?.setValue(tipo); // Establece el valor seleccionado
  }
  obtenerCategorias() {
    this.categoriaService.getCategoriaxEvento(this.id).subscribe((data) => {
      this.categorias = data;
      this.obtenerEvento();
    });
  }
  getDist() {
    this.distanciaService.getDistancias().subscribe((data) => {
      this.dist = data;
    });
  }
  obtenerTipo() {
    this._tipoService.getTipos().subscribe(
      (data: Tipo[]) => {
        this.tipos = data;
      },
      (error) => {
        console.error('Error al cargar los lugares', error);
      }
    );
  }
  obtenerEvento() {
    if (this.id) {
      this._eventoService.getEvento(this.id).subscribe((data) => {
        (this.currentEvent = data),
          this.eventoForm.patchValue({
            nombre: data.evento.nombre,
            fecha: this.getFormattedDate(data.evento.fecha), // Convierte la fecha al formato adecuado
            lugar: data.evento.lugar,
            tipo: data.evento.tipo.id,
            imagen: 'https://localhost:7296' + data.evento.imagen,
            estado: data.evento.estado,

            // Agrega otros campos según sea necesario
          });
        console.log(data);
        this.setDistancias(data.distancias);
      });
    }
  }

  onImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.eventoForm.patchValue({
        imagen: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(this.eventoForm.value.imagen);
    }
  }
  goBack(): void {
    this.location.back();
  }
  // updateImage(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile);

  //     this._eventoService.updateImage(this.id, formData).subscribe(
  //       (response: string) => {
  //         console.log(response); // "Imagen actualizada"
  //         this.obtenerEvento(); // Recargar los datos del evento
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }}
  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  setDistancias(distancias: any[]): void {
    const distanciaFGs = distancias.map((eventoDistancias) =>
      this.fb.group(eventoDistancias)
    );
    const distanciaFormArray = this.fb.array(distanciaFGs);
    this.eventoForm.setControl('eventoDistancias', distanciaFormArray);
  }
  get eventoDistancias(): FormArray {
    return this.eventoForm.get('eventoDistancias') as FormArray;
  }
  get categoriasEv(): FormArray {
    return this.eventoForm.get('categorias') as FormArray;
  }
  addDistancia(): void {
    this.eventoDistancias.push(
      this.fb.group({
        km: [''],
        precio: [''],
      })
    );
  }
  updateDistancia(index: number, event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast del evento al elemento HTMLSelectElement
    const value = target.value;

    if (value) {
      const distancia = this.dist.find((d) => d.id === +value);
      if (distancia) {
        this.eventoDistancias.at(index).patchValue({
          km: distancia.km,
        });
      }
    }
  }

  removeDistancia(index: number): void {
    this.eventoDistancias.removeAt(index);
  }

  removeCategoria(index: number): void {
    this.categoriasEv.removeAt(index);
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    console.log('Fecha seleccionada:', selectedDate);
    // Actualizar el valor del formulario si es necesario
    this.eventoForm.patchValue({ fecha: selectedDate });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const formData = new FormData();

      // Agregar los campos
      formData.append('nombre', this.eventoForm.value.nombre);
      formData.append('fecha', this.eventoForm.value.fecha);
      formData.append('lugar', this.eventoForm.value.lugar);
      formData.append('hora', this.eventoForm.value.hora); // Esto debe ser un string
      formData.append('estado', this.eventoForm.value.estado);

      // Agregar el archivo (si existe)
      if (this.eventoForm.value.imagen) {
        formData.append('imagen', this.eventoForm.value.imagen);
      }

      // Agregar las distancias
      const distancias = this.eventoForm.value.eventoDistancias;
      if (distancias && distancias.length > 0) {
        formData.append('eventoDistancias', JSON.stringify(distancias));
      }

      console.log('Datos del evento:', this.eventoForm);
      this._eventoService.updateEvento(this.id, formData).subscribe(() => {
        this.isEditing = false; // Volver a modo solo lectura
        this.obtenerEvento();
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
}
