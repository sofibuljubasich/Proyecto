import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-resultados',
  standalone: false,
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css',
})
export class VerResultadosComponent {
  eventoId!: number;

  constructor(private aRoute: ActivatedRoute) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
  }
}
