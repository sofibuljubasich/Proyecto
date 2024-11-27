import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { Evento, EventoResponse } from 'src/app/interfaces/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private datePipe: DatePipe
  ) {
    this.eventoForm = this.fb.group({
      nombre: [''],
      fecha: [''],
      lugar: [''],
      tipo: [''],
      imagen: [''],
      estado: [''],
      eventoDistancias: this.fb.array([]),
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerEvento();
  }
  selectTipo(tipo: string) {
    this.eventoForm.get('tipo')?.setValue(tipo); // Establece el valor seleccionado
  }
  obtenerEvento() {
    if (this.id) {
      this._eventoService.getEvento(this.id).subscribe((data) => {
        (this.currentEvent = data),
          this.eventoForm.patchValue({
            nombre: data.evento.nombre,
            fecha: this.getFormattedDate(data.evento.fecha), // Convierte la fecha al formato adecuado
            lugar: data.evento.lugar,
            tipo: data.evento.tipo.descripcion,
            imagen: data.evento.imagen,
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
  get distancias(): FormArray {
    return this.eventoForm.get('distancias') as FormArray;
  }

  setDistancias(distancias: any[]): void {
    const distanciaFGs = distancias.map((eventoDistancias) =>
      this.fb.group(eventoDistancias)
    );
    const distanciaFormArray = this.fb.array(distanciaFGs);
    this.eventoForm.setControl('distancias', distanciaFormArray);
  }

  addDistancia(): void {
    this.distancias.push(
      this.fb.group({
        km: [''],
        precio: [''],
      })
    );
  }

  removeDistancia(index: number): void {
    this.distancias.removeAt(index);
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    console.log('Fecha seleccionada:', selectedDate);
    // Actualizar el valor del formulario si es necesario
    this.eventoForm.patchValue({ fecha: selectedDate });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const eventoData = this.eventoForm.value;

      console.log('Datos del evento:', eventoData);
      this._eventoService.updateEvento(this.id, eventoData).subscribe(() => {
        this.isEditing = false; // Volver a modo solo lectura
        this.obtenerEvento();
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
}
