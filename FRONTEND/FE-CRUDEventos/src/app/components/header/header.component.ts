import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css',
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  currentUser: Usuario | null = null;
  imagenURL!: string;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      this.isAuthenticated = !!userId;
      if (userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.imagenURL = `https://localhost:7296${user.imagen}`;
            console.log(this.currentUser.imagen);
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
  logout(): void {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
