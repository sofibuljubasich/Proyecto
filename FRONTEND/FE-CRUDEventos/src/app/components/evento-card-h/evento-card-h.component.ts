import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-evento-card-h',
  templateUrl: './evento-card-h.component.html',
  styleUrl: './evento-card-h.component.css',
})
export class EventoCardHComponent implements OnInit {
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
  constructor(private _authService: AuthService, private router: Router) {}
  onInscribirse(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate([`/inscribirse/${this.eventoResp.evento.id}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
