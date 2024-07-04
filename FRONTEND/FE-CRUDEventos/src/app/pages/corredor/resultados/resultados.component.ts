import { Component } from '@angular/core';
import { EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  eventosInactivos: EventoResponse[] = [];
  constructor(private _eventoService: EventoService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventosInactivos = data.filter(
        (evento) => evento.evento.estado === 'Inactivo'
      );
    });
  }
}
