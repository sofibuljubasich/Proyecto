import { Component } from '@angular/core';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vista-tareas',
  templateUrl: './vista-tareas.component.html',
  styleUrl: './vista-tareas.component.css',
})
export class VistaTareasComponent {
  eventos: any = [];
  eventosActivos: any = [];
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
    this._eventoService.buscar(this.parametrosBusqueda).subscribe(
      (data: any[]) =>{
      this.eventos = data;
      this.filtrarEventos(this.eventos);
    });
  }

  parametrosBusqueda: Busqueda = {
    texto: '',
    fechaIni: '',
    fechaFin: '',
    tipoEvento: '',
    lugar: '',
  };

  // ver que los eventos inactivos tengan resultados
  filtrarEventos(ev:any[]): void {
    this.eventosActivos = ev.filter(
      // fijarse q tengan resultados
      (evento) => evento.estado !== 'Inactivo'
    );
  }
}
