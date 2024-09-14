import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrl: './mis-eventos.component.css'
})
export class MisEventosComponent {
  eventosActivos: any[] = [];
  constructor(private _eventoService: EventoService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }
  obtenerEventos(): void {
    this._eventoService.buscar(this.parametrosBusqueda).subscribe(
      (data: any[]) =>{
      this.filtrarEventos(data);
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
    this.eventosActivos= ev.filter(
      (evento) => evento.estado === 'Activo'
    );
  }
}
