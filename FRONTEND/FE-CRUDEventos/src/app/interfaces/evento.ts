export interface Evento {
  id: number;
  nombre: string;
  fecha: Date;
  lugar: string;
  estado: string;
  imagen?: string;
  tipo: Tipo;
}
// Definición de la interfaz para la respuesta completa
export interface EventoResponse {
  evento: Evento;
  categorias: Categoria[];
  distancias: Distancia[];
}

export interface Tipo {
  id: number;
  descripcion: string;
}

export interface Categoria {
  id: number;
  edadInicio: number;
  edadFin: number;
}

export interface Distancia {
  id: number;
  distanciaID: number;
  km: number;
  precio: number;
}
