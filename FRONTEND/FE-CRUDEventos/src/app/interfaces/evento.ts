export interface Evento {
  id: number;
  nombre: string;
  fecha: Date;
  lugar: string;
  estado: string;
  imagen?: string;
  imgb64?: string;
}
// Definición de la interfaz para la respuesta completa
export interface EventoResponse {
  evento: Evento;
  categorias: Categoria[];
  distancias: Distancia[];
}

// Definición de la interfaz Categoria (asumiendo que tiene estas propiedades)
export interface Categoria {
  id: number;
  nombre: string;
}

// Definición de la interfaz Distancia (asumiendo que tiene estas propiedades)
export interface Distancia {
  id: number;
  kilometros: number;
}
