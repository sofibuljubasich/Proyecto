import { Component, HostListener } from '@angular/core';
import { Evento, EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.css'],
})
export class PagPrincipalComponent {
  eventos: EventoResponse[] = [];
  eventosActivos: EventoResponse[] = [];
  eventosInactivos: EventoResponse[] = [];
  constructor(private _eventoService: EventoService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
      this.filtrarEventos();
    });
  }
  // ver que los eventos inactivos tengan resultados
  filtrarEventos(): void {
    this.eventosInactivos = this.eventos.filter(
      (evento) => evento.evento.estado === 'Inactivo'
    );
    this.eventosActivos = this.eventos.filter(
      (evento) => evento.evento.estado !== 'Inactivo'
    );
  }
}
