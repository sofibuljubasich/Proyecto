export interface Evento {
  id: number;
  nombre: string;
  fecha: Date;
  lugar: string;
  estado: string;
  imagen?: string;
  tipo: Tipo;
}



// Definir el tipo de eventoData
export interface EventoData {
  userEmail: string;
  password: string;
  nombre: string;
  fecha: string;
  lugar: string;
  hora: string;
  eventoCategorias: Categoria[];  // Definir eventoCategorias como un array de CategoriaResponse
  eventoDistancias: EventoDistancia[]; // Puedes definir un tipo específico si lo necesitas
  tipoID: number | null;
}

// Inicializar eventoData con los valores correctos
let eventoData: EventoData = {
  userEmail: '',
  password: '',
  nombre: '',
  fecha: '',
  lugar: '',
  hora: '',
  eventoCategorias: [], // Inicializado como un array vacío de CategoriaResponse
  eventoDistancias: [],
  tipoID: null
};

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
export interface EventoDistancia {
  distanciaID: number;
  precio: number;
}
