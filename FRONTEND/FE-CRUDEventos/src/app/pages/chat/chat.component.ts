import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat, Mensaje } from 'src/app/interfaces/chat';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  otroId!: string;
  otroIdN!: number;
  selectedChat: any;
  nuevoMensaje: string = '';
  mensajes: any[] = [];
  usuarioID!: number;
  otro!: Usuario;
  imagenURL!: string;

  constructor(
    private route: ActivatedRoute,
    private _chatService: ChatService,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.otroId = String(this.route.snapshot.paramMap.get('id'));
    this.otroIdN = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getOtro();
    this.getMensajes();
  }
  getUsuario(): void {
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this.usuarioID = Number(userId);
      }
    });
  }
  getOtro(): void {
    this._userService.getUsuario(this.otroId).subscribe((user) => {
      this.otro = user;
      this.imagenURL = `https://localhost:7296${user.imagen}`;
    });
  }
  getMensajes(): void {
    this._chatService.getMensajes(this.usuarioID, this.otroIdN).subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data;
        console.log(data);
        console.log(this.usuarioID);
      },
      (error) => {
        console.error('Error obteniendo los mensajes', error);
      }
    );
  }

  ngAfterViewChecked(): void {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  enviarMensaje(): void {
    if (this.nuevoMensaje.trim()) {
      const mensaje = {
        remitenteID: this.usuarioID,
        destinatarioID: this.otroId,
        contenido: this.nuevoMensaje,
      };

      this._chatService.sendMensaje(mensaje).subscribe(
        (data) => {
          this.mensajes.push(data); // Agrega el mensaje enviado a la lista de mensajes
          this.nuevoMensaje = ''; // Limpia la barra de texto
        },
        (error) => {
          console.error('Error enviando el mensaje', error);
        }
      );
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer && this.messagesContainer.nativeElement) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
