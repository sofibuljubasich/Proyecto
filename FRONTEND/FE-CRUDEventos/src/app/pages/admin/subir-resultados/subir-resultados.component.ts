import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-subir-resultados',
  templateUrl: './subir-resultados.component.html',
  styleUrl: './subir-resultados.component.css',
})
export class SubirResultadosComponent {
  idEvento!: number; // Recibe el ID del evento
  file!: File | null;

  constructor(
    private http: HttpClient,
    private aRoute: ActivatedRoute,
    private _eventoService: EventoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {
    this.idEvento = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else {
      this.file = null;
    }
  }

  uploadFile(): void {
    if (this.file) {
      this._eventoService.cargarResultados(this.idEvento, this.file).subscribe({
        next: (response) => {
          console.log('Archivo cargado exitosamente', response);
          this.snackBar.open('Archivo cargado exitosamente', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
          this.router.navigate(['/ABM-Eventos']);
        },
        error: (error) => {
          console.error('Error al cargar el archivo', error);
          // Maneja el error aquí, mostrando un mensaje de error si es necesario
        },
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
