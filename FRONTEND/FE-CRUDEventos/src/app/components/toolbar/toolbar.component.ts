import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
})
export class ToolbarBasicExample implements OnInit {
  userRole: number = 1;
  rol: string = 'inscriptor';
  isAuthenticated: boolean = false;
  currentUser: Usuario | null = null;
  isLoginPage: boolean = false;
  configuracionVisible = false;

  toggleConfiguracion() {
    this.configuracionVisible = !this.configuracionVisible;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        // Comprobar si la URL actual es la página de login
        this.isLoginPage = this.router.url.includes('/login');
      }
    });
    this._authService.userId$.subscribe((userId) => {
      this.isAuthenticated = !!userId;
      if (!!userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.userRole = user.rolID;
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      } else {
        this.currentUser = null;
      }
    });
  }
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService,
    private _rolService: RolService
  ) {
    // cada vez q haya un evento del router se ejecuta la subscripcion
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/inicio':
          case '/eventos':
          case '/ABM-Eventos':
          case '/eventosActivos':
            this.seleccionado = [true, false, false, false, false];
            break;
          case '/proximos-eventos':
          case '/chats':
          case '/ayudaI':
            this.seleccionado = [false, true, false, false, false];
            break;
          case '/resultados':
          case '/ayudaV':
          case '/vistaTareas':
            this.seleccionado = [false, false, true, false, false];
            break;
          case '/ABM-Colaboradores':
          case '/ABM-Categorias':
          case '/ABM-Distancias':
          case '/ayuda':
            this.seleccionado = [false, false, false, true, false];
            break;
          case '/misEventos':
          case '/ayudaA':
            this.seleccionado = [false, false, false, false, true];
            break;
          default:
            this.seleccionado = [false, false, false, false, false];
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
