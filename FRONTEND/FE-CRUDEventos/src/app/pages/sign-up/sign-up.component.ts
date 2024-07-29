import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signupFormPart1!: FormGroup;
  signupFormPart2!: FormGroup;
  signupFormPart3!: FormGroup;
  showStep: number = 1;
  signupForm!: FormGroup;
  errorMessage: string | null = null;
  showError: boolean = false;
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null; // URL de la imagen seleccionada
  rol: number = 1;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupFormPart1 = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      genero: ['', Validators.required],
      localidad: ['', [Validators.required]],
      dni: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      fechaNacimiento: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
    });
    this.signupFormPart2 = this.fb.group({
      imagen: [null],
    });
    this.signupFormPart3 = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: this.passwordsMatch('password', 'confirmPassword'),
      }
    );
  }
  nextSection(): void {
    this.showStep++;
  }

  previousSection(): void {
    this.showStep--;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.signupFormPart2.patchValue({
        imagen: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(this.signupFormPart2.value.imagen);
    }
  }

  passwordsMatch(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordsMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  onNext() {
    if (this.signupFormPart1.valid) {
      this.showStep = 2;
    } else {
      this.signupFormPart1.markAllAsTouched();
    }
  }

  onSubmit() {
    if (this.signupFormPart3.valid) {
      const formData = new FormData();
      formData.append('nombre', this.signupFormPart1.value.nombre);
      formData.append('apellido', this.signupFormPart1.value.apellido);
      formData.append('telefono', this.signupFormPart1.value.telefono);
      formData.append('genero', this.signupFormPart1.value.genero);
      formData.append('localidad', this.signupFormPart1.value.localidad);
      formData.append('dni', this.signupFormPart1.value.dni);
      formData.append(
        'fechaNacimiento',
        this.signupFormPart1.value.fechaNacimiento.toISOString()
      );
      formData.append('obraSocial', this.signupFormPart1.value.obraSocial);
      formData.append('email', this.signupFormPart3.value.email);
      formData.append('password', this.signupFormPart3.value.password);
      formData.append('imagen', this.signupFormPart2.value.imagen);
      formData.append('rolID', '1');
      console.log(formData);
      this._authService.register(formData).subscribe(
        (response) => {
          console.log('Autenticado con éxito:', response);
          this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.errorMessage = null;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en la autenticación:', error);
          this.errorMessage = error;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      );
    } else {
      this.signupFormPart3.markAllAsTouched();
    }
  }
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
