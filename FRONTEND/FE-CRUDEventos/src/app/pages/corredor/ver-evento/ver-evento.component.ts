import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.css'],
})
export class VerEventoComponent implements OnInit {
  eventoData!: EventoResponse;
  id!: number;
  fecha!: string;

  constructor(
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private _authService: AuthService
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerEvento();
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  obtenerEvento(): void {
    this._eventoService.getEvento(this.id).subscribe((data) => {
      this.eventoData = data;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        data.evento.nombre
      );
    });
  }
  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  onInscribirse(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate([`/inscribirse/${this.eventoData.evento.id}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
