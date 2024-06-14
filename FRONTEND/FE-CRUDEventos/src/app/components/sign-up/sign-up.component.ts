import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signupFormPart1!: FormGroup;
  signupFormPart3!: FormGroup;
  showSecondStep: boolean = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // this.signupForm = this.fb.group(
    //   {
    //     nombre: ['', [Validators.required, Validators.minLength(3)]],
    //     apellido: ['', [Validators.required, Validators.minLength(3)]],
    //     direccion: ['', Validators.required],
    //     telefono: [
    //       '',
    //       [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
    //     ],
    //     genero: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     localidad: ['', [Validators.required]],
    //     dni: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.minLength(8),
    //         Validators.maxLength(8),
    //       ],
    //     ],
    //     fechaNacimiento: ['', [Validators.required]],
    //     obraSocial: ['', [Validators.required]],
    //   }
    //   // { validator: this.passwordMatchValidator }
    // );
  }

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
    this.signupFormPart3 = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  // passwordMatchValidator(form: FormGroup) {
  //   return form.get('password')!.value === form.get('confirmPassword')!.value
  //     ? null
  //     : { mismatch: true };
  // }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')!.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')!.setErrors(null);
    }
  }
  // passwordMatchValidator(control: AbstractControl) {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (!password || !confirmPassword) return null;

  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
  // }
  onNext() {
    if (this.signupFormPart1.valid) {
      console.log(this.showSecondStep);
      console.log('Formulario completo:', {
        ...this.signupFormPart1.value,
      });
      this.showSecondStep = true;
    } else {
      console.log(this.showSecondStep);
      this.signupFormPart1.markAllAsTouched();
    }
    this.showSecondStep = true;
  }

  onSubmit() {
    if (this.signupFormPart3.valid) {
      const usuarioData = {
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
      };
      this.authService.register(usuarioData).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          //this.router.navigate(['/login']); // Redirigir al login después del registro exitoso
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
      // Aquí puedes enviar los datos del formulario completo
      console.log('Formulario completo:', {
        ...this.signupFormPart1.value,
        ...this.signupFormPart3.value,
      });
    } else {
      this.signupFormPart3.markAllAsTouched();
    }

    // Object.values(this.signupForm.controls).forEach((control) => {
    //   control.markAsTouched();
    // });
    // if (this.signupForm.valid) {
    //   if (this.signupForm.valid) {
    //     console.log('Form Submitted!', this.signupForm.value);
    //   } else {
    //     this.validateAllFormFields(this.signupForm);
    //   }

    // this.authService.register(this.signupForm.value).subscribe(
    //   (response) => {
    //     console.log('User registered successfully', response);
    //     this.router.navigate(['/login']); // Redirigir al login después del registro exitoso
    //   },
    //   (error) => {
    //     console.error('Error registering user', error);
    //   }
    // );}
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

// email: ['', [Validators.required, Validators.email]],
// password: ['', [Validators.required, Validators.minLength(6)]],
// confirmPassword: ['', [Validators.required]],
