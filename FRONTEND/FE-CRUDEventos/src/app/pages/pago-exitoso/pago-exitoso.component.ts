import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [MatIconModule,RouterModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css'
})
export class PagoExitosoComponent {

}
