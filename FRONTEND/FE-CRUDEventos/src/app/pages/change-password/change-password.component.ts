import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isAuthenticated: boolean = false;
  currentUser!: Usuario ;
  changePasswordForm: FormGroup;
  showError: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar:MatSnackBar
  ) {
    this.changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator });
}

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId) => {
      this.isAuthenticated = !!userId;
      if (userId) {
        this._userService.getUsuario(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      }
    });
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this._authService.changePassword(this.currentUser.email,currentPassword, newPassword)
        .subscribe({
          next: (response) => {
            console.log('Autenticado con éxito:', response);
            this.snackBar.open('Contraseña cambiada con exito', 'Cerrar', {
              duration: 3000,
            });
  
            this.clearErrorMessage();
            this.router.navigate(['/inicio']);
  
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
        this.changePasswordForm.markAllAsTouched();
      }
    }
    clearErrorMessage() {
      this.errorMessage = null;
      this.showError = false;
    }
}
