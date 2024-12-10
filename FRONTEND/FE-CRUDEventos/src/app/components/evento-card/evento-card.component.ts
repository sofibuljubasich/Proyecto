import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Evento, EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserService } from 'src/app/services/user.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'evento-card',
  templateUrl: 'evento-card.component.html',
  styleUrls: ['evento-card.component.css'],
})
export class EventoCardComponent implements OnInit {
  @Input() eventoResp!: any;
  formattedDate: string = '';
  formattedName: string = '';
  imagenURL!: string;
  currentUser!: any;
  misEventos: any[] = [];
  isInscrito!: boolean;

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.obtenerMisEventos();
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      }
    });
    this.imagenURL = `https://localhost:7296${this.eventoResp.imagen}`;
    this.formattedDate = this.formatDate(this.eventoResp.fecha);
    this.formattedName = this.capitalizeFirstLetter(this.eventoResp.nombre);
  }
  estaInscrita(evento: any): boolean {
    // console.log(evento);
    return this.misEventos.some((e) => e.id === evento.id);
  }
  obtenerMisEventos(): void {
    this._inscripcionService
      .getInscxUsuario(this.currentUser.id)
      .subscribe((data: any[]) => {
        this.misEventos = data;
      });
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
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _inscripcionService: InscripcionService,
    private _userService: UserService
  ) {}
  onInscribirse(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate([`/inscribirse/${this.eventoResp.id}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
