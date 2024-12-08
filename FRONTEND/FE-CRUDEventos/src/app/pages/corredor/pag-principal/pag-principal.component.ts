import {
  Component,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { Evento, EventoResponse, Tipo } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.css'],
})
export class PagPrincipalComponent implements OnChanges {
  eventos: any[] = [];
  eventosActivos: any[] = [];
  eventosInactivos: any[] = [];
  tipos: Tipo[] = []; // Reemplaza con tus tipos
  lugares: string[] = []; // Reemplaza con tus lugares
  userRole: number = 1;
  textoBusqueda: string = '';
  fechaDesde: string = '';    // Almacena la fecha desde para el filtro
  fechaHasta: string = '';    // Almacena la fecha hasta para el filtro
  tipoEvento: string = '';    // Almacena el tipo de evento seleccionado
  lugar: string = ''; 

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerLugares();
    this.obtenerTipos();
  }
  ngOnChanges(changes: SimpleChanges): void {
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
  filtrarEventos(): void {
    let eventosFiltrados = this.eventos.filter((evento) =>
      evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );

    if (this.fechaDesde) {
      eventosFiltrados = eventosFiltrados.filter((evento) =>
        new Date(evento.fecha) >= new Date(this.fechaDesde)
      );
    }
    if (this.fechaHasta) {
      eventosFiltrados = eventosFiltrados.filter((evento) =>
        new Date(evento.fecha) <= new Date(this.fechaHasta)
      );
    }

    // Filtra por tipo de evento
    if (this.tipoEvento) {
      eventosFiltrados = eventosFiltrados.filter(
        (evento) => evento.tipoID == this.tipoEvento
      );
    }

    // Filtra por lugar
    if (this.lugar) {
      eventosFiltrados = eventosFiltrados.filter(
        (evento) => evento.lugar===this.lugar
      );
    }

    this.eventosInactivos = eventosFiltrados.filter(
      (evento) => evento.estado === 'Inactivo'
    );

    // Filtra los eventos activos
    this.eventosActivos = eventosFiltrados.filter(
      (evento) => evento.estado !== 'Inactivo'
    );
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
    tipoEvento: '',
    lugar: '',
  };

  // ver que los eventos inactivos tengan resultados
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.eventosActivos.filter = filterValue.trim().toLowerCase();
    // this.eventosInactivos.filter = filterValue.trim().toLowerCase();
  }
}
