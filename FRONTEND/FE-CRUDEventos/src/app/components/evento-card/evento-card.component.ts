import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { Evento, EventoResponse } from 'src/app/interfaces/evento';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'evento-card',
  templateUrl: 'evento-card.component.html',
  styleUrls: ['evento-card.component.css'],
})
export class EventoCardComponent implements OnInit {
  @Input() eventoResp!: EventoResponse;
  formattedDate: string = '';
  formattedName: string = '';

  ngOnInit(): void {
    this.formattedDate = this.formatDate(this.eventoResp.evento.fecha);
    this.formattedName = this.capitalizeFirstLetter(
      this.eventoResp.evento.nombre
    );
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const month = monthNames[date.getMonth()];
    return `${day} de ${month}`;
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  constructor() {}
}
