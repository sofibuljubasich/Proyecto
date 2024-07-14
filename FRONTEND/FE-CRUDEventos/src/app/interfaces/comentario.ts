export interface Comentario {
  id: number;
  fechaHora: Date;
  contenido: string;
  nombreCorredor: string;
  corredorID: number;
}
export interface ComentarioNuevo {
  fechaHora: string;
  contenido: string;
  corredorID: number;
  eventoID: number;
}
