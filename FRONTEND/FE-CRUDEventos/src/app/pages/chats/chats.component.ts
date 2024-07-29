import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';
import { CHAT_DATA } from 'src/app/interfaces/dato';
import { Chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  // eventos: EventoResponse[] = [];
  // eventosActivos: EventoResponse[] = [];
  id: number;
  chats: Chat[] = CHAT_DATA;
  formattedDate: string = '';

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
    // this.obtenerEventos();
  }

  // obtenerChats(): void {
  //   this._eventoService.getEventos().subscribe((data: any[]) => {
  //     this.eventos = data;
  //   });
  // }

  parametrosBusqueda: Busqueda = {
    texto: '',
    fechaIni: '',
    fechaFin: '',
    tipoEvento: 0,
    lugar: '',
  };

  buscar() {
    console.log(this.parametrosBusqueda);
    // this._eventoService.buscar(this.parametrosBusqueda)
  }
}
