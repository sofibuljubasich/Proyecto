import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Corredor } from 'src/app/interfaces/usuario'; // Interfaz proporcionada
import { CorredorService } from 'src/app/services/corredor.service'; // Un servicio para manejar usuarios
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  corredor: Corredor | null = null; // Datos del usuario
  isEditing: boolean = false;
  idCorredor: number = 0;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private _corredorService: CorredorService,
    private aRoute: ActivatedRoute
  ) {
    // Inicializa el formulario reactivo
    this.perfilForm = this.fb.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      localidad: ['', Validators.required],
      dni: ['', Validators.required],
      genero: ['', Validators.required],
      obraSocial: [''],
    });
    this.aRoute.queryParams.subscribe((params) => {
      this.idCorredor = params['id'] || 0; // Valor por defecto
    });
  }

  ngOnInit(): void {
    this.cargarPerfil(); // Llama a cargarPerfil con el id del corredor
  }

  // Método para cargar el perfil del usuario
  cargarPerfil(): void {
    const idAsString: string = String(this.idCorredor);

    this._corredorService.getCorredor(idAsString).subscribe({
      next: (corredor) => {
        this.corredor = corredor;
        if (corredor.fechaNacimiento) {
          corredor.fechaNacimiento = corredor.fechaNacimiento.split('T')[0];
        }
        this.perfilForm.patchValue(corredor); // Carga los datos en el formulario
      },
      error: (err) => console.error('Error al cargar el perfil', err),
    });
  }

  // Método para habilitar la edición del perfil
  habilitarEdicion(): void {
    this.isEditing = true;
    this.perfilForm.enable(); // Habilita todos los campos para editar
    //this.perfilForm.get('email')?.disable(); // El email no debe ser editable
  }

  // Método para guardar los cambios
  guardarCambios(): void {
    if (this.perfilForm.valid) {
      const datosActualizados = this.perfilForm.value;
      this._corredorService
        .Update(this.idCorredor, datosActualizados)
        .subscribe({
          next: () => {
            this.isEditing = false;
            this.perfilForm.disable();
            this.snackBar.open('Perfil actualizado exitosamente', 'Cerrar', {
              duration: 400,
            });
            window.location.reload();
            // this.router.navigate(['/inicio']);
          },
          error: (err) => console.error('Error al actualizar el perfil', err),
        });
    }
  }

  // Método para cancelar la edición
  cancelarEdicion(): void {
    this.isEditing = false;
    this.perfilForm.patchValue(this.corredor!); // Restaura los datos originales
    this.perfilForm.disable(); // Deshabilita los campos nuevamente
  }
}
