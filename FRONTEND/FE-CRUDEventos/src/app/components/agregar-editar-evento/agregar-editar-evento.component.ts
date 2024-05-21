import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-agregar-editar-evento',
  templateUrl: './agregar-editar-evento.component.html',
  styleUrls: ['./agregar-editar-evento.component.css'],
})
export class AgregarEditarEventoComponent implements OnInit {
  eventoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    fecha: ['', Validators.required],
    imagen: ['', Validators.required],
  });
  // // imagenSeleccionada: File;

  constructor(private fb: FormBuilder, private _eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen: ['', Validators.required],
    });
  }

  // onFileSelected(evento: Evento): void {
  //   this.imagenSeleccionada = evento.target.files[0] as File;
  // }

  // onSubmit(): void {
  //   const formData = new FormData();
  //   formData.append('nombre', this.eventoForm.value.nombre);
  //   formData.append('fecha', this.eventoForm.value.fecha);
  //   formData.append('imagen', this.imagenSeleccionada);

  //   this.eventoService.agregarEvento(formData).subscribe(
  //     (response) => {
  //       console.log('Evento agregado correctamente:', response);
  //       // Realizar acciones adicionales, como redireccionar a otra página
  //     },
  //     (error) => {
  //       console.error('Error al agregar evento:', error);
  //     }
  //   );
  // }
}
