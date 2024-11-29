import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmailPopupComponent } from 'src/app/components/email-popup/email-popup.component';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-abm-eventos',
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.css',
})
export class ABMEventosComponent {
  eventos: any = [];

  onToggleChange(evento: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const nuevoEstado = input.checked; // Obtén el valor booleano del checkbox

    // Actualiza el estado localmente
    if (nuevoEstado) {
      evento.estado = 'Activo';
    } else {
      evento.estado = 'Inactivo';
    }

    // Realizar la llamada HTTP para actualizar el estado en el backend
    this._eventoService.updateEstado(evento.id, nuevoEstado).subscribe(
      () => {
        console.log('Estado actualizado');
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService,
    private _authService: AuthService,
    private _userService: UserService,
    private aRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }
  verInscripciones(id: number, nombre: string): void {
    console.log('Evento seleccionado:', nombre);
    // Puedes redirigir o realizar otra acción con los datos.
    // Ejemplo: usar el Router para pasar parámetros
    this._router.navigate(['/verInscripciones', id], {
      queryParams: { nombre: nombre },
    });
  }

  obtenerEventos(): void {
    this._eventoService
      .buscar(this.parametrosBusqueda)
      .subscribe((data: any[]) => {
        this.eventos = data;
        console.log(this.eventos);
        //this.filtrarEventos(this.eventos);
      });
  }
  enviarMail(id: number) {
    console.log(id);
    const dialogRef = this.dialog.open(EmailPopupComponent, {
      data: { id }, // Pasa el eventoID al popup
    });
  }

  parametrosBusqueda: Busqueda = {
    texto: '',
    fechaIni: '',
    fechaFin: '',
    tipoEvento: '',
    lugar: '',
  };
}
