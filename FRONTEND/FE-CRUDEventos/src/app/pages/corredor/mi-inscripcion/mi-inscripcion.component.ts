import { DatePipe,  Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mi-inscripcion',
  templateUrl: './mi-inscripcion.component.html',
  styleUrl: './mi-inscripcion.component.css'
})
export class MiInscripcionComponent {
  eventoData!: EventoResponse;
  id!: number;
  fecha!: string;
  imagenURL!: string;
  userID!: string;
  currentUser!: Usuario;

  constructor(
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private location: Location,
    private datePipe: DatePipe,
    private _authService: AuthService
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerEvento();
    this._authService.userId$.subscribe((userId) => {
      console.log('id', userId);
      // this.userID = userId;
      if (!!userId) {
        this.userID = userId;
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
          },
        });
      }
    });
    this.obtenerEvento();
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  obtenerEvento(): void {
    this._eventoService.getEvento(this.id).subscribe((data) => {
      this.eventoData = data;
      this.imagenURL = `https://localhost:7296${this.eventoData.evento.imagen}`;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        data.evento.nombre
      );
    });
  }
  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  getFormattedTime(date: string | Date): string | null {
    return this.datePipe.transform(date, 'HH:mm');
  }
  goBack(): void {
    this.location.back();
  }
  onInscribirse(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate([`/inscribirse/${this.eventoData.evento.id}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
