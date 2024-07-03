import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
})
export class ToolbarBasicExample {
  userRole: string = 'usuario';

  constructor(private router: Router, private _authService: AuthService) {
    // cada vez q haya un evento del router se ejecuta la subscripcion
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/inicio':
          case '/eventos-voluntario':
          case '/ABM-eventos':
            this.seleccionado = [true, false, false, false];
            break;
          case '/proximos-eventos':
          case '/chats':
            this.seleccionado = [false, true, false, false];
            break;
          case '/resultados':
          case '/ABM-colaboradores':
            this.seleccionado = [false, false, true, false];
            break;
          case '/vista-tareas':
            this.seleccionado = [false, false, false, true];
            break;
          default:
            this.seleccionado = [false, false, false, false];
            break;
        }
      }
    });
  }

  seleccionado = [true, false, false, false];

  navegar(direccion: string) {
    this.router.navigate([direccion]);
  }
}
// navbarfixed: boolean = false;
// @HostListener('window:scroll', ['$event']) onscroll() {
//   // Verificar si el usuario ha hecho scroll hacia abajo
//   if (window.scrollY > 100) {
//     this.navbarfixed = true;
//   } else {
//     this.navbarfixed = false;
//   }
// }
