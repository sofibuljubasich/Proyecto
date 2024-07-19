import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-eventos-activos',
  templateUrl: './eventos-activos.component.html',
  styleUrl: './eventos-activos.component.css',
})
export class EventosActivosComponent {
  eventos: EventoResponse[] = [];
  eventosActivos: EventoResponse[] = [];

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
      this.filtrarEventos();
    });
  }

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
  // ver que los eventos inactivos tengan resultados
  filtrarEventos(): void {
    this.eventosActivos = this.eventos.filter(
      // fijarse q tengan resultados
      (evento) => evento.evento.estado !== 'Inactivo'
    );
  }
}
