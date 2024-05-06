import { Component, Input, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { OwlOptions } from 'ngx-owl-carousel-o';

const ELEMENT_DATA: Event[] = [];

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['Previo', 'Proximo'],
    // navClass: ['owl-prev', 'owl-next'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}
