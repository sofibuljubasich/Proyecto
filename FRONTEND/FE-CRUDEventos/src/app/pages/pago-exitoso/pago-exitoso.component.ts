import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css',
})
export class PagoExitosoComponent implements OnInit {
  mensaje: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    // Verificar si los parámetros de la URL están presentes
    if (queryParams['status'] === 'approved') {
      // Obtener el ID del pago desde los parámetros de la URL
      const paymentId = queryParams['payment_id'];

      // Enviar el ID del pago al backend para completar la inscripción
      this.http
        .get(`/api/payment/status?paymentId=${paymentId}`)
        .subscribe(
          (response: any) => {
            // Verifica que el backend respondió correctamente
            this.mensaje = '¡Pago exitoso! Tu inscripción ha sido registrada.';
            this.loading = false;
          },
          (error) => {
            this.mensaje = 'Hubo un problema al procesar tu inscripción.';
            this.loading = false;
          }
        );
    } else {
      this.mensaje = 'El pago no fue completado.';
      this.loading = false;
    }
  }
}
