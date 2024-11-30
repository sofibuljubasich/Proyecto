import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  email!:string ; //me tiene q llegar de algun lado
  loginForm!: FormGroup;
  loginData = { email: '',token: '', newPassword: '' };
  errorMessage: string | null = null;
  showError: boolean = false;
  userRol!: number;
  showStep: number = 1;
  token!: string ;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.passwordsMatch('password', 'confirmPassword'),
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
      // Aquí puedes agregar la lógica para validar el token y permitir el cambio de contraseña
    });
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
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

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginData.email = this.email;  //ver
      this.loginData.token = this.token;
      this.loginData.newPassword = this.loginForm.value.password;
      // console.log(this.loginData);
      this._authService.resetPassword(this.loginData).subscribe({
        next: (response) => {
          console.log('Autenticado con éxito:', response);
          this.snackBar.open('Contraseña cambiada con exito', 'Cerrar', {
            duration: 3000,
          });

          this.clearErrorMessage();
          this.router.navigate(['/login']);

        }, // Redirige a la página de inicio o dashboard},
        error: (error) => {
          console.error('Error en la autenticación:', error);
          this.errorMessage = error;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        },
        complete: () => console.info('complete'),
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  clearErrorMessage() {
    this.errorMessage = null;
    this.showError = false;
  }

}

