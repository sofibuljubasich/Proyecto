import { Usuario } from './usuario';

export interface Mensaje {
  id: number;
  fechaHoraEnvio: Date;
  contenido: string;
  remitenteID: number;
  destinatarioID: number;
  estadoLeido: boolean;
}
// get mensajes donde mi id es emisor o es receptor
export interface Chat {
  remitenteID: number;
  destinatarioID: number;
  destinatario: Usuario;
  cantidadSinLeer: number;
}
