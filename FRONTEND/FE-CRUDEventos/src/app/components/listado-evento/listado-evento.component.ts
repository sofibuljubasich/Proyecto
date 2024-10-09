import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento, EventoResponse } from 'src/app/interfaces/evento';
import { OwlOptions } from 'ngx-owl-carousel-o';

const listEventos: Evento[] = [];

@Component({
  selector: 'app-listado-evento',
  templateUrl: './listado-evento.component.html',
  styleUrls: ['./listado-evento.component.css'],
})
export class ListadoEventoComponent implements OnInit,AfterViewInit {
  @Input() eventos: any[] | null = null;
  filtrados: any[] | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.eventos) {
      this.filtrados = this.eventos.sort(
        (a, b) =>
          new Date(a.fecha).getTime() -
          new Date(b.fecha).getTime()
      );
    }
  }

  ngAfterViewInit(): void {

  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    items: 4,
    navText: [
      
      '<span style="color: black; font-size: 2em;"><< Previo</span>',
      '<span style="color: black; font-size: 2em;">Próximo >></span>',
    ],
    // navClass: ['owl-prev', 'owl-next'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
    autoWidth:true,
    //center:true
    

  };
  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    items: 4,
    navText: [
      
      '<span style="color: black; font-size: 2em;"><< Previo</span>',
      '<span style="color: black; font-size: 2em;">Próximo >></span>',
    ],
    // navClass: ['owl-prev', 'owl-next'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      800: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: true,
    autoWidth:true,
    //center:true
    

  };


}

// obtenerEvento(): void {
//   this._eventoService.getEventos().subscribe((data) => {
//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i]);
//       let a = data[i];
//       let evv = this.convertirABase64(a.imagen);
//       console.log(a.fecha);
//       data[i].imgb64 = evv;
//     }
//     // this.eventos = data.map((evento) => {
//     //   console.log(evento);
//     //   let evv = this.convertirABase64(evento.imagen);
//     //   console.log(evv);
//     //   return evento;
//     // });
//   });
// }
// obtenerEvento(): void {
//   this._eventoService.getEventos().subscribe((data) => {
//     console.log('Datos recibidos:', data); // Depuración de datos recibidos
//     this.eventos = data.map((evento) => {
//       console.log('Procesando evento:', evento); // Depuración de cada evento
//       if (evento) {
//         try {
//           evento.imgb64 = this.convertirABase64(evento.imagen);
//           console.log('Imagen convertida:', evento.imgb64); // Depuración de imagen convertida
//         } catch (error) {
//           console.error('Error al convertir la imagen:', error); // Depuración de errores
//         }
//       } else {
//         console.log('Evento sin imagen:', evento); // Depuración de evento sin imagen
//       }
//       return evento;
//     });
//     console.log('Eventos procesados:', this.eventos); // Depuración de eventos procesados
//   });
// }

// convertirABase64(binario: any): string {
//   let binary = '';
//   console.log(binario);
//   const bytes = new Uint8Array(binario);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return 'data:image/jpeg;base64,' + window.btoa(binary);
// }
