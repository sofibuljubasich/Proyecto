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
  eventos: any[] = [];
  eventosActivos: any[] = [];

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService.buscar(this.parametrosBusqueda).subscribe(
      (data: any[]) =>{
      this.eventos = data;
      this.filtrarEventos(this.eventos);
    });
  }

  parametrosBusqueda: Busqueda = {
    texto: '',
    fechaIni: '',
    fechaFin: '',
    tipoEvento: '',
    lugar: '',
  };


  // ver que los eventos inactivos tengan resultados
  filtrarEventos(ev:any[]): void {
    this.eventosActivos = ev.filter(
      // fijarse q tengan resultados
      (evento) => evento.evento.estado !== 'Inactivo'
    );
  }
}
