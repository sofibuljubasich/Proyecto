import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  chats: [] = [];
  eventosActivos: EventoResponse[] = [];

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {}
}
