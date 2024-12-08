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
  textoBusqueda: string = '';

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this._eventoService
      .buscar(this.parametrosBusqueda)
      .subscribe((data: any[]) => {
        this.eventos = data;
        this.filtrarEventos();
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
  filtrarEventos(): void {
    let eventosFiltrados = this.eventos.filter((evento) =>
      evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
    this.eventosActivos = eventosFiltrados.filter(
      // fijarse q tengan resultados
      (evento) => evento.estado !== 'Inactivo'
    );
    
  }
}
