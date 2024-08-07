import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginData = { userEmail: '', password: '' };
  errorMessage: string | null = null;
  showError: boolean = false;
  userRol!: number;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? !control.valid && control.touched : false;
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
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginData.userEmail = this.loginForm.value.email;
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
