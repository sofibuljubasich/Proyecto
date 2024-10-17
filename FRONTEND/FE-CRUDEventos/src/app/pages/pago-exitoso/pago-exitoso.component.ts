import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscriber } from 'rxjs';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { PaymentService } from 'src/app/services/payment.service';

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
  estado!:string;
  id!:any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _paymentService: PaymentService,
    private _inscService:InscripcionService
  ) {}
  //id y status
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');
    console.log('se supone q esto es el id de la insc',this.id)
    if (queryParams['status'] === 'approved') {
 
      this.estado='Pagado'
    
            this._inscService.updateEstadoPago(this.id,this.estado).subscribe ((response:any)=>{
            // Verifica que el backend respondió correctamente
            console.log('¡Pago exitoso! Tu inscripción ha sido registrada.')
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
