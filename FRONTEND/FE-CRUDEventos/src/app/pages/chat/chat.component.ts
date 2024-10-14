import { Location } from '@angular/common';
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
  isScrolledToBottom: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _chatService: ChatService,
    private _authService: AuthService,
    private _userService: UserService,
    private location: Location
  ) {
    this.otroId = String(this.route.snapshot.paramMap.get('id'));
    this.otroIdN = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getOtro();
    this.getMensajes();
  }
  goBack(): void {
    this.location.back();
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

  ngAfterViewInit(): void {
    this.scrollToBottom(); // Al cargar el componente, desplazarse al final
  }

  ngAfterViewChecked(): void {
    if (this.isScrolledToBottom) {
      this.scrollToBottom(); // Desplazarse al final si está en la parte inferior
    }
  }

  scrollToBottom(): void {
    const chatMessages = document.querySelector('.chat-messages') as HTMLElement;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  onScroll(event: Event): void {
    const chatMessages = event.target as HTMLElement;
    const scrollTop = chatMessages.scrollTop;
    const scrollHeight = chatMessages.scrollHeight;
    const clientHeight = chatMessages.clientHeight;

    // Verifica si el usuario está al final del contenedor
    this.isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 1;
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

}
