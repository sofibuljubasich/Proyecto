import { Component, Input, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';

const ELEMENT_DATA: Event[] = [];

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent implements OnInit {
  @Input() items: Evento[] = [];
  ngOnInit() {
    this.items.map((i, index) => {
      i.id = index;
    });
  }
}
