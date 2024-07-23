import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-eventos-vol',
  templateUrl: './eventos-vol.component.html',
  styleUrl: './eventos-vol.component.css',
})
export class EventosVolComponent {
  eventos: EventoResponse[] = [];
  eventosActivos: EventoResponse[] = [];
  userRole: number = 3;

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
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

  obtenerEventos(): void {
    this._eventoService.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
      this.filtrarEventos();
    });
  }

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
  // ver que los eventos inactivos tengan resultados
  filtrarEventos(): void {
    this.eventosActivos = this.eventos.filter(
      // fijarse q tengan resultados
      (evento) => evento.evento.estado !== 'Inactivo'
    );
  }
}
