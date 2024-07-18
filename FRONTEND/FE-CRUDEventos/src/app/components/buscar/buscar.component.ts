import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent {
  constructor(private _eventoService: EventoService) {}
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
}
