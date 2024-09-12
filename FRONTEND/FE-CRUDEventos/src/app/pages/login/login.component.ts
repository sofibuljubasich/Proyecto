import { Component, Inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailForm!: FormGroup;
  loginData = { userEmail: '', password: '' };

  errorMessage: string | null = null;
  showError: boolean = false;
  reset:boolean= false;
  userRol!: number;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.emailForm = this.fb.group({
      emailReset: ['', [Validators.required, Validators.email]],
    });
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

  get emailReset() {
    return this.emailForm.get('emailReset');
  }

  get password() {
    return this.loginForm.get('password');
  }
  resetPass(){
    this.reset=true;
    console.log(this.reset)
  }
  onReset(){
    if (this.emailForm.valid) {
      const emailReset = this.emailForm.value.emailReset;
      console.log(emailReset)
      this._authService.forgotPassword(emailReset).subscribe({
        next: (response) => {
          console.log('Autenticado con éxito:', response);

          this.errorMessage = null;
          this.dialog.open(DialogContentComponent, {
            data: {
              message:
                response,
            },
          });
          this.reset=false;
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en la autenticación:', error);
          this.errorMessage = error;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
    });
    } else {
      this.emailForm.markAllAsTouched();
    }

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
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  previousSection(): void {
    this.reset=false;
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
      
      this.dialogRef.close();
    }
}
