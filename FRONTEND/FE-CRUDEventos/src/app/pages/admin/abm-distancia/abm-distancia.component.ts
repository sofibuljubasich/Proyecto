import { Component, OnInit } from '@angular/core';
import { DistanciaService } from '../../services/distancia.service';
import { Distancia } from '../../models/distancia';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.component.html',
  styleUrls: ['./distancia.component.css']
})
export class DistanciaComponent implements OnInit {
  distancias: Distancia[] = [];
  selectedDistancia: Distancia | null = null;

  constructor(private distanciaService: DistanciaService) {}

  ngOnInit(): void {
    this.loadDistancias();
  }

  loadDistancias(): void {
    this.distanciaService.getDistancias().subscribe((data) => {
      this.distancias = data;
    });
  }

  selectDistancia(distancia: Distancia): void {
    this.selectedDistancia = { ...distancia };
  }

  clearSelection(): void {
    this.selectedDistancia = null;
  }

  saveDistancia(): void {
    if (this.selectedDistancia) {
      if (this.selectedDistancia.id) {
        this.distanciaService.updateDistancia(this.selectedDistancia).subscribe(() => this.loadDistancias());
      } else {
        this.distanciaService.createDistancia(this.selectedDistancia).subscribe(() => this.loadDistancias());
      }
      this.clearSelection();
    }
  }

  deleteDistancia(id: number): void {
    this.distanciaService.deleteDistancia(id).subscribe(() => this.loadDistancias());
  }
}
