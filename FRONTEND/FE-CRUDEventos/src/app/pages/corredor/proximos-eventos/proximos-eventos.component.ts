import { Component } from '@angular/core';
import { EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-proximos-eventos',
  templateUrl: './proximos-eventos.component.html',
  styleUrl: './proximos-eventos.component.css',
})
export class ProximosEventosComponent {
  eventosActivos: EventoResponse[] = [];
  constructor(private _eventoService: EventoService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventosActivos = data.filter(
        (evento) => evento.evento.estado !== 'Inactivo'
      );
    });
  }

  filtrarEventos(): void {}
}
