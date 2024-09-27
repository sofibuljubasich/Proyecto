import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrl: './mis-eventos.component.css',
})
export class MisEventosComponent {
  eventos: any[] = [];
  currentUser!: any;
  constructor(
    private _inscripcionService: InscripcionService,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.obtenerEventos();
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      }
    });
  }
  obtenerEventos(): void {
    this._inscripcionService
      .getInscxUsuario(this.currentUser.id)
      .subscribe((data: any[]) => {
        this.eventos = data;
        console.log(this.eventos);
      });
  }
  parametrosBusqueda: Busqueda = {
    texto: '',
    fechaIni: '',
    fechaFin: '',
    tipoEvento: '',
    lugar: '',
  };
}
