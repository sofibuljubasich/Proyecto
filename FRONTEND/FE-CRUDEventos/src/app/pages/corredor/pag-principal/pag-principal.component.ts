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
  eventos: any[] = [];
  eventosActivos: any[] = [];
  eventosInactivos: any[] = [];
  tipos: Tipo[] = []; // Reemplaza con tus tipos
  lugares: string[] = []; // Reemplaza con tus lugares
  userRole: number = 1;

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
    this._eventoService
      .buscar(this.parametrosBusqueda)
      .subscribe((data: any[]) => {
        this.eventos = data;
        this.filtrarEventos(this.eventos);
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
    tipoEvento: '',
    lugar: '',
  };

  // ver que los eventos inactivos tengan resultados
  filtrarEventos(ev: any[]): void {
    this.eventosInactivos = ev.filter((evento) => evento.estado === 'Inactivo');
    this.eventosActivos = ev.filter(
      // fijarse q tengan resultados
      (evento) => evento.estado !== 'Inactivo'
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.eventosActivos.filter = filterValue.trim().toLowerCase();
    // this.eventosInactivos.filter = filterValue.trim().toLowerCase();
  }
}
