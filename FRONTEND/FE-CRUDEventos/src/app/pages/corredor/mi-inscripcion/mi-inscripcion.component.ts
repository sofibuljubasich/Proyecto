import { DatePipe,  Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mi-inscripcion',
  templateUrl: './mi-inscripcion.component.html',
  styleUrl: './mi-inscripcion.component.css'
})
export class MiInscripcionComponent {
  eventoData!: any;
  userId!: string;
  id!: number;
  fecha!: string;
  imagenURL!: string;
  userID!: string;
  currentUser!: Usuario;

  constructor(
    private _eventoService: EventoService,
    private _inscripcionService: InscripcionService,
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

    this._authService.userId$.subscribe((userId) => {
      console.log('id', userId);
      // this.userID = userId;
      if (!!userId) {
        this.userID = userId;
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.userId= userId
            this.currentUser = user;
            this.obtenerInsc();
          },
        });
      }
    });
    this.obtenerInsc();
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  obtenerInsc(): void {
    this._inscripcionService.getInscripcion(this.id,this.userId).subscribe((insc) => {
      this.eventoData = insc;
      this.imagenURL = `https://localhost:7296${this.eventoData.imagen}`;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        insc.nombreEvento
      );
    })
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

}
