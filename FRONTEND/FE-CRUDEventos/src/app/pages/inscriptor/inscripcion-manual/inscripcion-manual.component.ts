import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { EventoResponse, Categoria } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscripcion-manual',
  templateUrl: './inscripcion-manual.component.html',
  styleUrl: './inscripcion-manual.component.css',
})
export class InscripcionManualComponent {
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
  usuarios: Usuario[] = [];
  filteredUsuarios!: Observable<Usuario[]>;
  emailControl = new FormControl();
  selectedEmail: string = '';
  idCorredor: number | null = null;

  metodosPago = [
    { value: 'efectivo', viewValue: 'Efectivo' },
    { value: 'mercado pago', viewValue: 'Mercado Pago' },
  ];
  talles = [
    { value: 'S', viewValue: 'S' },
    { value: 'M', viewValue: 'M' },
    { value: 'L', viewValue: 'L' },
    { value: 'XL', viewValue: 'XL' },
  ];

  constructor(
    private _eventoService: EventoService,
    private _inscripcionService: InscripcionService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerEvento();
    this.loadUsers();

    this.inscripcionForm = this.fb.group({
      talleRemera: ['', Validators.required],
      distancia: ['', Validators.required],
      metodoPago: ['', Validators.required],
    });
  }
  loadUsers(): void {
    this._userService.getUsuarios().subscribe((users) => {
      this.usuarios = users;
      this.filteredUsuarios = this.emailControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.usuarios.filter((user) =>
      user.email.toLowerCase().includes(filterValue)
    );
  }

  onEmailChange(email: string): void {
    const selectedUser = this.usuarios.find((user) => user.email === email);

    if (selectedUser) {
      this.idCorredor = selectedUser.id;
      this.age = this._userService.getUserAge(selectedUser);
      console.log(this.age);
      if (this.age !== null) {
        this.categoria = this.getCategoryByAge(this.age);
        this.category =
          this.categoria?.edadInicio + ' - ' + this.categoria?.edadFin;
      } else {
        this.category = '';
      }
    }
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  obtenerEvento(): void {
    this._eventoService.getEvento(this.id).subscribe((data) => {
      this.eventoData = data;
      this.eventoData.evento.nombre = this.capitalizeFirstLetter(
        data.evento.nombre
      );
    });
  }
  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  getCategoryByAge(age: number): Categoria | null {
    return (
      this.eventoData.categorias.find(
        (categoria) => age >= categoria.edadInicio && age <= categoria.edadFin
      ) || null
    );
  }
  onInscribirse(): void {
    if (
      !this.talleSelect ||
      !this.distanciaSelect ||
      !this.pagoSelect ||
      !this.idCorredor
    ) {
      this.errorMessage = 'Todos los campos son obligatorios';
      setTimeout(() => (this.errorMessage = ''), 3000); // Limpiar mensaje de error después de 3 segundos
      return;
    }
    const distanciaS = this.eventoData.distancias.find(
      (evento) => evento.km === this.distanciaSelect
    );
    const inscripcionData = {
      remera: this.talleSelect,
      formaPago: this.pagoSelect,
      estadoPago: 'Pendiente',
      distanciaID: distanciaS!.id,
      // usuarioID: 10,
      usuarioID: this.idCorredor,
      precio: distanciaS!.precio,
      eventoID: this.id,
    };
    this._inscripcionService.inscribir(inscripcionData).subscribe(
      (response) => {
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate([`/listaInscriptos/${this.id}`]);
      },
      (error) => {
        this.errorMessage = 'Error en la inscripción: ' + error;
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
