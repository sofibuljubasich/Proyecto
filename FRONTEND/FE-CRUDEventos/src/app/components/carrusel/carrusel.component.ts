import { Component, Input, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent {
  @Input() eventos: any[] | null = null;
  filtrados: any[] | null = null;

  @Input() eventoResp!: any;
  formattedDate: string = '';
  formattedName: string = '';
  imagenURL!: string;

  ngOnInit(): void {

    this.imagenURL = `https://localhost:7296${this.eventoResp.imagen}`;
    this.formattedDate = this.formatDate(this.eventoResp.fecha);
    this.formattedName = this.capitalizeFirstLetter(
      this.eventoResp.nombre
    );
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const month = monthNames[date.getMonth()];
    return `${day} de ${month}`;
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  constructor(private _authService: AuthService, private router: Router) {}


  ngAfterViewInit(): void {

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    items: 2,
    navText: [
      
      '<span class="carousel-nav-prev"><< Previo</span>',
      '<span class="carousel-nav-next"">Próximo >></span>',
    ],
    // navClass: ['owl-prev', 'owl-next'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      200: {
        items: 2,
      },
      300: {
        items: 3,
      },
      400: {
        items: 4,
      },
    },
    nav: true,
    autoWidth:true,
    //autoplay:true,
    //center:true
    

  };
}
