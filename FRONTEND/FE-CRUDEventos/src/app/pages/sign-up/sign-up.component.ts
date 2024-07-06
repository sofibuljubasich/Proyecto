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
      imagen: [''],
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
      this.signupFormPart2.value.image = file; // Asignar el archivo seleccionado al objeto registerData
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
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
      const usuarioData: Usuario = {
        nombre: this.signupFormPart1.value.nombre,
        apellido: this.signupFormPart1.value.apellido,
        telefono: this.signupFormPart1.value.telefono,
        genero: this.signupFormPart1.value.genero,
        localidad: this.signupFormPart1.value.localidad,
        dni: this.signupFormPart1.value.dni,
        fechaNacimiento: this.signupFormPart1.value.fechaNacimiento,
        obraSocial: this.signupFormPart1.value.obraSocial,
        email: this.signupFormPart3.value.email,
        password: this.signupFormPart3.value.password,
        imagen: this.signupFormPart2.value.imagen,
        // 'data:image/png;base64,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',
      };
      console.log(usuarioData);
      this._authService.register(usuarioData).subscribe(
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
