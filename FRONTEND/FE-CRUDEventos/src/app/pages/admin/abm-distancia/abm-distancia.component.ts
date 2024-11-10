import { Component, OnInit } from '@angular/core';
import { DistanciaService } from 'src/app/services/distancia.service';
import { Distancia, DistanciaResponse } from 'src/app/interfaces/distancia';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abm-distancia',
  templateUrl: './abm-distancia.component.html',
  styleUrls: ['./abm-distancia.component.css'],
})
export class DistanciaComponent implements OnInit {
  distancias: DistanciaResponse[] = [];
  selectedDistancia: DistanciaResponse | null = null;
  isAddingNew = false;
  newDistanceKm = 0;
  editDistanceId: number | null = null; // Guarda el id de la distancia que se está editando
  editedKm: number = 0;

  constructor(
    private distanciaService: DistanciaService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.loadDistancias();
  }

  loadDistancias(): void {
    this.distanciaService.getDistancias().subscribe((data) => {
      this.distancias = data;
      console.log(this.distancias);
    });
  }
  selectDistancia(distancia: DistanciaResponse) {
    this.editDistanceId = distancia.id;
    this.editedKm = distancia.km;
  }
  aceptarEdicion() {
    const distancia = this.distancias.find((d) => d.id === this.editDistanceId);
    if (distancia) {
      distancia.km = this.editedKm;
      this.distanciaService
        .updateDistancia(distancia.id, distancia)
        .subscribe(() => this.loadDistancias());
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.editDistanceId = null;
    this.editedKm = 0;
  }
  goBack() {
    this._location.back();
  }

  deleteDistancia(id: number): void {
    this.distanciaService
      .deleteDistancia(id)
      .subscribe(() => this.loadDistancias());
  }
  agregarNuevaDistancia() {
    this.isAddingNew = true;
    this.newDistanceKm = 0;
  }

  aceptarNuevaDistancia() {
    const newDistance = { km: this.newDistanceKm } as Distancia;
    console.log(newDistance);
    this.distanciaService
      .createDistancia(newDistance)
      .subscribe(() => this.loadDistancias());
    const nuevaDistancia = {
      id: this.distancias.length + 1,
      km: this.newDistanceKm,
    };
    this.distancias.push(nuevaDistancia);
    this.isAddingNew = false;
  }

  cancelarNuevaDistancia() {
    this.isAddingNew = false;
    this.newDistanceKm = 0;
  }
}
