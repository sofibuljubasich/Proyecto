import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  email!:string ; //me tiene q llegar de algun lado
  loginForm!: FormGroup;
  loginData = { userEmail: '', password: '' };
  errorMessage: string | null = null;
  showError: boolean = false;
  userRol!: number;
  showStep: number = 1;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.passwordsMatch('password', 'confirmPassword'),
    });
  }
  ngOnInit(): void {}

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
  
  previousSection(): void {
    // this.showStep--;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginData.userEmail = this.email;  //ver
      this.loginData.password = this.loginForm.value.password;
      // console.log(this.loginData);
      this._authService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Autenticado con éxito:', response);
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 3000,
          });

          this.clearErrorMessage();
          this._userService.getUsuario(JSON.stringify(response.id)).subscribe({
            next: (user) => {
              this.userRol = user.rolID;
              console.log('rol: ', this.userRol);
              this.navegar(this.userRol);
            },
            error: (error) => {
              console.error('Failed to fetch user data:', error);
            },
          });
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
      // if (this.loginForm.valid) {
      //   console.log('exito');
      //    const usuarioData: Usuario = {
      //      email: this.loginForm.value.email,
      //      password: this.loginForm.value.password,
      //    };
      //    console.log(usuarioData);
      //    this._authService.register(usuarioData);
      // } else {
      //   this.loginForm.markAllAsTouched();
      // }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  clearErrorMessage() {
    this.errorMessage = null;
    this.showError = false;
  }
  navegar(id: number) {
    switch (id) {
      case 1: //usuario - 1
        this.router.navigate(['/inicio']);
        break;
      case 4: //inscriptor - empleado - 4
        this.router.navigate(['/eventosActivos']);
        break;
      case 2: //voluntario - 3
        this.router.navigate(['/eventos']);
        break;
      case 3: //admin - 2
        this.router.navigate(['/ABM-Eventos']);
        break;
    }
  }
}

