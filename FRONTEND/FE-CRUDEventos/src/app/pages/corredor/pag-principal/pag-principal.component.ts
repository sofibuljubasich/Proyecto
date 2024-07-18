import { Component, HostListener } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { Evento, EventoResponse, Tipo } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.css'],
})
export class PagPrincipalComponent {
  eventos: EventoResponse[] = [];
  eventosActivos: EventoResponse[] = [];
  eventosInactivos: EventoResponse[] = [];
  tipos: Tipo[] = []; // Reemplaza con tus tipos
  lugares: string[] = []; // Reemplaza con tus lugares

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerLugares();
    this.obtenerTipos();
  }

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
      this.filtrarEventos();
    });
  }
  obtenerTipos(): void {
    this._tipoService.getTipos().subscribe(
      (data: Tipo[]) => {
        this.tipos = data;
      },
      (error) => {
        console.error('Error al cargar los lugares', error);
      }
    );
  }
  obtenerLugares(): void {
    this._eventoService.getLugares().subscribe(
      (data: string[]) => {
        this.lugares = data;
      },
      (error) => {
        console.error('Error al cargar los lugares', error);
      }
    );
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
    this.eventosInactivos = this.eventos.filter(
      (evento) => evento.evento.estado === 'Inactivo'
    );
    this.eventosActivos = this.eventos.filter(
      // fijarse q tengan resultados
      (evento) => evento.evento.estado !== 'Inactivo'
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.eventosActivos.filter = filterValue.trim().toLowerCase();
    // this.eventosInactivos.filter = filterValue.trim().toLowerCase();
  }
}
