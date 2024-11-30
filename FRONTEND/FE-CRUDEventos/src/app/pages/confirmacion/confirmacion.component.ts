import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmationComponent {
  constructor(private router: Router) { }

  // Método opcional para manejar la redirección al iniciar sesión
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
