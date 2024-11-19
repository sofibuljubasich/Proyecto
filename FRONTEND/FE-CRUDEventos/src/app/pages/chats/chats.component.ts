import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Busqueda } from 'src/app/interfaces/busqueda';
import { EventoResponse } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatSelectorComponent } from 'src/app/components/chat-selector/chat-selector.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  // eventos: EventoResponse[] = [];
  // eventosActivos: EventoResponse[] = [];
  id: number;
  chats: Chat[] = [];
  formattedDate: string = '';
  usuarioID: any;
  baseUrl: string = `https://localhost:7296`;
  searchText: string = '';

  constructor(
    private _eventoService: EventoService,
    private _tipoService: TipoEventoService,
    private _authService: AuthService,
    private _userService: UserService,
    private aRoute: ActivatedRoute,
    private _chatService: ChatService,
    private dialog: MatDialog
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getChats();
  }
  getUsuario(): void {
    this._authService.userId$.subscribe((userId) => {
      if (userId) {
        this.usuarioID = userId;
      }
    });
  }
  refrescar(): void {
    this.getChats();
  }
  getChats(): void {
    this._chatService.getChats(this.usuarioID).subscribe(
      (data) => {
        this.chats = data;
        this.chats = data.map((chat: Chat) => {
          // Si el backend proporciona una ruta relativa, la concatenamos con la URL base
          chat.destinatario.imagen = `${this.baseUrl}${chat.destinatario.imagen}`;
          return chat;
        });
        console.log(data);
      },
      (error) => {
        console.error('Error obteniendo los chats', error);
      }
    );
  }
  abrirChatSelector() {
    console.log('hola');
    const dialogRef = this.dialog.open(ChatSelectorComponent);
  }
}
