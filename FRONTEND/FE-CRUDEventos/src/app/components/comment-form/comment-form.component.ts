import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  comment: string = '';

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentFormComponent>
  ) {}

  submitComment(): void {
    // Aquí puedes manejar el envío del comentario, por ejemplo, emitir un evento o llamar a un servicio.
    this.bottomSheetRef.dismiss(this.comment); // Devuelve el comentario al componente que lo abrió.
  }

  onNoClick(): void {
    this.bottomSheetRef.dismiss(); // Cierra el bottom sheet sin hacer nada.
  }
}
