export interface Mensaje {
  id: number;
  fechaHora: string;
  contenido: string;
  idEmisor: number;
  idReceptor: number;
}
// get mensajes donde mi id es emisor o es receptor
export interface Chat {
  mensajes: Mensaje[];
}
