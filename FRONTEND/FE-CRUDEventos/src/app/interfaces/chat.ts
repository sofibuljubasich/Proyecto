export interface Mensaje {
  id: number;
  fechaHora: Date;
  contenido: string;
  idEmisor: number;
  idReceptor: number;
}
// get mensajes donde mi id es emisor o es receptor
export interface Chat {
  idChat: number;
  idEmisor: string;
  foto: string;
  mensajes: Mensaje[];
}
