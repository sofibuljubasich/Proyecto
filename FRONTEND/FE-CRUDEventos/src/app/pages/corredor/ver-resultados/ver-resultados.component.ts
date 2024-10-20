import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-ver-resultados',
  standalone: false,
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css',
})
export class VerResultadosComponent {
  eventoId!: number;
  eventoData!: EventoResponse;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _eventoService: EventoService
  ) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.obtenerEvento();
  }

  obtenerEvento(): void {
    this._eventoService.getEvento(this.eventoId).subscribe((data) => {
      this.eventoData = data;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        data.evento.nombre
      );
    });
  }
  goBack(): void {
    this.location.back();
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
