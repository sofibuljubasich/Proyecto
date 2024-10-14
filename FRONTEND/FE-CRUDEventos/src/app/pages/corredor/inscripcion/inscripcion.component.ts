import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, EventoResponse } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CorredorService } from 'src/app/services/corredor.service';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
declare const MercadoPago: any;

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css',
})
export class InscripcionComponent {
  eventoData!: EventoResponse;
  id!: number;
  fecha!: string;
  age: number | null = null;
  categoria: Categoria | null = null;
  category: string = '20-24';
  talleSelect!: string;
  distanciaSelect!: number;
  pagoSelect!: string;
  inscripcionForm!: FormGroup;
  errorMessage!: string;
  currentUser!: Usuario;
  userID!: number;
  imagenURL!: string;
  preferenceId!: any;

  metodosPago = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Mercado Pago', viewValue: 'Mercado Pago' },
  ];
  talles = [
    { value: 'S', viewValue: 'S' },
    { value: 'M', viewValue: 'M' },
    { value: 'L', viewValue: 'L' },
    { value: 'XL', viewValue: 'XL' },
  ];
  mp: any;

  constructor(
    private _eventoService: EventoService,
    private _inscripcionService: InscripcionService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _authService: AuthService,
    private _corredorService: CorredorService,
    private _paymentService: PaymentService
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.mp = new MercadoPago('APP_USR-136e7dcf-f8a5-4da2-9373-8ef757b3954a', {
      locale: 'es-AR', // Configura tu región
    });
    this.obtenerEvento();
    this.obtenerCorredor();

    this.inscripcionForm = this.fb.group({
      talleRemera: ['', Validators.required],
      distancia: ['', Validators.required],
      metodoPago: ['', Validators.required],
    });
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  obtenerEvento(): void {
    this._eventoService.getEvento(this.id).subscribe((data) => {
      console.log('data', data);
      this.eventoData = data;
      this.imagenURL = `https://localhost:7296${this.eventoData.evento.imagen}`;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        data.evento.nombre
      );
      this.obtenerCorredor();
    });
  }
  obtenerCorredor(): void {
    this._authService.userId$.subscribe((userId) => {
      console.log('id', userId);
      // this.userID = userId;
      if (!!userId) {
        this._corredorService.getCorredor(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.age = this._corredorService.getUserAge(this.currentUser);
            console.log('edad', this.age);
            if (this.age != null) {
              this.getCategoryByAge(this.age);
            }
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      }
    });
  }
  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  getFormattedTime(date: string | Date): string | null {
    return this.datePipe.transform(date, 'HH:mm');
  }
  getCategoryByAge(age: number) {
    this.categoria =
      this.eventoData.categorias.find(
        (categoria) => age >= categoria.edadInicio && age <= categoria.edadFin
      ) || null;
  }

  // Método para generar el botón de pago
  pagar() {
    if (!this.talleSelect || !this.distanciaSelect || !this.pagoSelect) {
      this.errorMessage = 'Todos los campos son obligatorios';
      setTimeout(() => (this.errorMessage = ''), 3000); // Limpiar mensaje de error después de 3 segundos
      return;
    }

    this.onInscribirse();

    const distanciaS = this.eventoData.distancias.find(
      (evento) => evento.distanciaID === this.distanciaSelect
    );

    const producto = {
      title: this.eventoData.evento.nombre,
      quantity: 1,
      unitPrice: Number(distanciaS!.precio),
    };
    this._paymentService.createPreference(producto).subscribe(
      (response: any) => {
        console.log(response);
        this.preferenceId = response.id; // El ID de la preferencia creada

        // Integrar Mercado Pago Checkout Pro
        const mp = new MercadoPago(
          'APP_USR-136e7dcf-f8a5-4da2-9373-8ef757b3954a',
          {
            locale: 'es-AR',
          }
        );

        mp.checkout({
          preference: {
            id: this.preferenceId,
          },
          autoOpen: true, // Abrir el checkout inmediatamente
          onSuccess: (payment: any) => {

          },
        });
      },
      (error) => {
        console.error('Error al crear la preferencia:', error);
      }
    );
  }
  onInscribirse(): void {
    if (!this.talleSelect || !this.distanciaSelect || !this.pagoSelect) {
      this.errorMessage = 'Todos los campos son obligatorios';
      setTimeout(() => (this.errorMessage = ''), 3000); // Limpiar mensaje de error después de 3 segundos
      return;
    }
    const distanciaS = this.eventoData.distancias.find(
      (evento) => evento.distanciaID === this.distanciaSelect
    );
    const estado = 'Pendiente';
    //if (this.pagoSelect != 'Efectivo') {
    //  const estado = 'Pagado';
    //}

    const inscripcionData = {
      remera: this.talleSelect,
      formaPago: this.pagoSelect,
      estadoPago: estado,
      distanciaID: this.distanciaSelect,
      // usuarioID: 10,
      usuarioID: this.currentUser.id,
      precio: distanciaS!.precio,
      eventoID: this.eventoData.evento.id,
      nroTransaccion: this.preferenceId,
    };
    console.log(inscripcionData);
    this._inscripcionService.inscribir(inscripcionData).subscribe(
      (response) => {
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/inicio']);
      },
      (error) => {
        this.errorMessage = 'Error en la inscripción: ' + error;
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
