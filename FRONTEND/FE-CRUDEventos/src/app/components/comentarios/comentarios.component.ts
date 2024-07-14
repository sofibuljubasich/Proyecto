import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comentario, ComentarioNuevo } from 'src/app/interfaces/comentario';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-comentarios',
  standalone: false,
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
})
export class ComentariosComponent implements OnInit, OnChanges {
  @Input() eventoId!: number;
  comentarios: Comentario[] = [];
  mostrarFormulario = false;
  comentarioForm!: FormGroup;

  constructor(
    private _comentarioService: ComentarioService,
    private fb: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComentarios();
    this.comentarioForm = this.fb.group({
      contenido: ['', Validators.required],
    });
  }
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  enviarComentario(): void {
    if (this.comentarioForm.valid) {
      const nuevoComentario: Partial<ComentarioNuevo> = {
        fechaHora: new Date().toISOString(),
        contenido: this.comentarioForm.value.contenido,
        corredorID: this._authService.getCurrentUser().id, // Suponiendo que tienes un método para obtener el usuario actual
        eventoID: this.eventoId,
      };

      this._comentarioService
        .crearComentario(nuevoComentario)
        .subscribe((comentario) => {
          this.comentarios.push(comentario);
          this.comentarioForm.reset();
          this.mostrarFormulario = false;
        });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoId'] && !changes['eventoId'].firstChange) {
      console.log('Evento ID cambiado en ComentariosComponent:', this.eventoId);
      this.loadComentarios();
    }
  }
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
