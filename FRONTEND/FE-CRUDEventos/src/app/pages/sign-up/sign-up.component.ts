import { Component, Inject, OnInit } from '@angular/core';
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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CorredorService } from 'src/app/services/corredor.service';

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
  existingDnis: string[] = [];
  dniError: string | null = null;
  maxDate: Date = new Date();
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _corredorService: CorredorService
  ) { this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);}

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
        confirmPassword: ['', [Validators.required]],
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
    this.dniError = null;
    if (this.signupFormPart1.invalid) {
      this.signupFormPart1.markAllAsTouched();
      return;
    }

    const dni = this.signupFormPart1.get('dni')?.value;

    this._corredorService.verificarDni(dni).subscribe({
      next: (isRegistered) => {
        if (isRegistered) {
          this.dniError = 'Ya se encuentra registrado un usuario con ese DNI.';
        } else {
          this.showStep = 2;
        }
      },
    });
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
      this._authService.register(formData).subscribe(
        (response) => {
          console.log('Autenticado con éxito:', response);

          this.errorMessage = null;
          this.dialog.open(DialogContentComponent, {
            data: {
              message:
                'Le hemos enviado un mail a su cuenta, por favor, verifiquela',
            },
          });
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

@Component({
  selector: 'dialog-content',
  template: `
    <div
      class="container-msj"
      style="  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;"
    >
      <h1 mat-dialog-title>Verifique su email</h1>
      <div mat-dialog-content style="  padding: 10px;">{{ data.message }}</div>
      <div mat-dialog-actions>
        <button
          style="padding: 10px;
    background-color:#419197;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 15px;
    width: 30%"
          mat-button
          (click)="onClose()"
        >
          Cerrar
        </button>
      </div>
    </div>
  `,
})
export class DialogContentComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
}
