import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-abm-eventos',
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.css',
})
export class ABMEventosComponent {
  eventos: any = [];
  eventosActivos: any = [];
  id: number;

  onToggleChange(evento: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const nuevoEstado = input.checked; // Obtén el valor booleano del checkbox
    console.log(nuevoEstado);

    // Actualiza el estado localmente
    evento.estado = nuevoEstado;

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
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.buscar(this.parametrosBusqueda).subscribe(
      (data: any[]) =>{
      this.eventos = data;
      //this.filtrarEventos(this.eventos);
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
