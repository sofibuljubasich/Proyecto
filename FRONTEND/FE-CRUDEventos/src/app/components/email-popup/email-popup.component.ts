import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrl: './email-popup.component.css',
})
export class EmailPopupComponent {
  asunto: string = '';
  mensaje: string = '';
  eventoID!: number;

  // Configuración para TinyMCE
  tinyMceConfig: any = {
    height: 250,
    menubar: 'file edit insert view format table tools',
    plugins: 'emoticons table link media code preview fullscreen',
    toolbar:
      'undo redo | bold italic | alignleft aligncenter alignright | link image media',
  };

  constructor(
    public dialogRef: MatDialogRef<EmailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _eventoService: EventoService,
    private snackBar: MatSnackBar
  ) {
    this.eventoID = data.id;
  }

  enviarEmail(): void {
    console.log(this.eventoID);
    this._eventoService
      .enviarEmail(this.eventoID, this.asunto, this.mensaje)
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response);
          this.snackBar.open(response, 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
          this.resetForm();
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackBar.open('Error al enviar el email', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
        },
      });
  }

  resetForm(): void {
    this.asunto = '';
    this.mensaje = '';
  }

  closeModal(): void {
    this.dialogRef.close();
    const modal = document.querySelector('.modal') as HTMLElement;
    modal.style.display = 'none';
  }
}
