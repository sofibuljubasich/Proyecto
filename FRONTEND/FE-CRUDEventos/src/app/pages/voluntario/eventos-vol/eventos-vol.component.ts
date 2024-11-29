import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TareaVoluntarioService } from 'src/app/services/tarea-voluntario.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-eventos-vol',
  templateUrl: './eventos-vol.component.html',
  styleUrl: './eventos-vol.component.css',
})
export class EventosVolComponent {
  eventos: any[] = [];
  eventosActivos: any[] = [];
  userRole: number = 3;
  searchText: string = '';

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService,
    private _authService: AuthService,
    private _userService: UserService,
    private _vtService: TareaVoluntarioService
  ) {}

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      if (!!userId) {
        this.obtenerEventos(userId);
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

  obtenerEventos(userId: string): void {
    this._vtService.getEventosxVoluntario(userId).subscribe((data: any[]) => {
      console.log(data);
      this.filtrarActivos(data);
    });
  }

  // ver que los eventos inactivos tengan resultados
  filtrarActivos(ev: any[]): void {
    this.eventosActivos = ev.filter((evento) => evento.estado !== 'Inactivo');
  }
  filtrarEventos(): void {
    // Aplica el filtro basado en el texto ingresado
    const texto = this.searchText.toLowerCase();
    this.eventosActivos = this.eventos.filter((evento) =>
      evento.nombre.toLowerCase().includes(texto)
    );
  }
}
