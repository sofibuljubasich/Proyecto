import { Component, OnInit } from '@angular/core';
import { General } from 'src/app/interfaces/usuario';
import { VoluntarioService } from 'src/app/services/voluntario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abm-tareas',
  templateUrl: './abm-tareas.component.html',
  styleUrl: './abm-tareas.component.css',
})
export class AbmTareasComponent implements OnInit {
  voluntarios: General[] | undefined;

  constructor(
    private _volService: VoluntarioService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.obtenerVoluntarios();
  }
  obtenerVoluntarios(): void {
    this._volService.getVoluntarios().subscribe((data: General[]) => {
      this.voluntarios = data;
      console.log(this.voluntarios);
    });
  }
  goBack() {
    this._location.back();
  }
}
