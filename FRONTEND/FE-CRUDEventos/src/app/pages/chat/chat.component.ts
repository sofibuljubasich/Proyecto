import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { CHAT_DATA } from 'src/app/interfaces/dato';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  chat: Chat | undefined;
  id!: number;
  selectedChat: any;
  nuevoMensaje: string = '';

  constructor(private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    console.log(this.id);
    this.chat = this.getChatById(this.id);
    console.log(this.chat);
  }
  getChatById(id: number): Chat | undefined {
    return CHAT_DATA.find((c) => c.idChat === id);
  }
  ngAfterViewChecked(): void {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  enviarMensaje(): void {
    if (this.nuevoMensaje.trim().length > 0 && this.chat) {
      console.log(this.chat);

      const mensajes = this.chat.mensajes || [];
      const nuevoId = mensajes.length
        ? Math.max(...mensajes.map((m: { id: number }) => m.id)) + 1
        : 1;

      this.chat.mensajes.push({
        id: nuevoId,
        fechaHora: new Date(),
        contenido: this.nuevoMensaje,
        idEmisor: 5, // Cambia esto según el usuario actual
        idReceptor: this.chat.mensajes[0]?.idReceptor || 6, // Cambia esto según el receptor
      });
      this.nuevoMensaje = ''; // Limpiar el campo de entrada
    }
  }
  private scrollToBottom(): void {
    if (this.messagesContainer && this.messagesContainer.nativeElement) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
