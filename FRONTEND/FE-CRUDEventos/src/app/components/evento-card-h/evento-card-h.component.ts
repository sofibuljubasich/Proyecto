import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-evento-card-h',
  templateUrl: './evento-card-h.component.html',
  styleUrl: './evento-card-h.component.css',
})
export class EventoCardHComponent implements OnInit {
  @Input() eventoResp!: any;
  formattedDate: string = '';
  formattedName: string = '';
  userRole: number = 3;
  imagenURL!: string;

  ngOnInit(): void {
    this.imagenURL = `https://localhost:7296${this.eventoResp.imagen}`;
    this.formattedDate = this.formatDate(this.eventoResp.fecha);
    this.formattedName = this.capitalizeFirstLetter(this.eventoResp.nombre);
    this._authService.userId$.subscribe((userId) => {
      if (!!userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.userRole = user.rolID;
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      }
    });
  }
  verInscriptos(eventoId: number, eventoNombre: string): void {
    this.router.navigate(['/listaInscriptos', eventoId], {
      queryParams: { nombre: eventoNombre },
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
    private _userService: UserService
  ) {}
}
