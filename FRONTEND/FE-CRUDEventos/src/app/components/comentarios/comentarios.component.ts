import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comentario, ComentarioNuevo } from 'src/app/interfaces/comentario';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { CorredorService } from 'src/app/services/corredor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comentarios',
  standalone: false,
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
})
export class ComentariosComponent implements OnInit {
  @Input() eventoId!: number;
  comentarios: Comentario[] = [];
  mostrarFormulario = false;
  comentarioForm!: FormGroup;
  currentUser: any;
  isAuthenticated:boolean= false

  constructor(
    private _comentarioService: ComentarioService,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _corredorService: CorredorService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated= this._authService.isAuthenticated();
    this.loadComentarios();
    this.comentarioForm = this.fb.group({
      contenido: ['', Validators.required],
    });
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this._corredorService.getCorredor(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
          },
          error: (error) => {
            console.error('Failed to fetch user data:', error);
          },
        });
      } else {
        this.currentUser = null;
      }
    });
  }
  toggleFormulario(): void {
    if (this.isAuthenticated) {
      this.mostrarFormulario = !this.mostrarFormulario;
    } else {
      // Lógica cuando el usuario está autenticado
      this.showMessage();
    }

  }
  showMessage() {
    this.snackBar.open('Usuario no participó del evento', '', {
      duration: 3000, // Duración en milisegundos
    });
  }
  enviarComentario(): void {
    if (this.comentarioForm.valid) {
      console.log(this.currentUser);
      const nuevoComentario: Partial<ComentarioNuevo> = {
        fechaHora: new Date().toISOString(),
        contenido: this.comentarioForm.value.contenido,
        corredorID: this.currentUser.id,
        eventoID: this.eventoId,
      };
      console.log(nuevoComentario);
      this._comentarioService
        .crearComentario(nuevoComentario)
        .subscribe((comentario) => {
          comentario.nombreCorredor =
            this.currentUser.nombre + ' ' + this.currentUser.apellido;
          this.comentarios.push(comentario);
          console.log(comentario);
        });
      this.comentarioForm.reset();
      this.toggleFormulario();
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['eventoId'] && !changes['eventoId'].firstChange) {
  //     console.log('Evento ID cambiado en ComentariosComponent:', this.eventoId);
  //     this.loadComentarios();
  //   }
  // }
  private loadComentarios(): void {
    if (this.eventoId) {
      this._comentarioService
        .getComentarios(this.eventoId)
        .subscribe((data: Comentario[]) => {
          this.comentarios = data;
        });
    }
  }
}
