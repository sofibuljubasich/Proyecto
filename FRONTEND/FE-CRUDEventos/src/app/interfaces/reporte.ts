export interface ReporteCategoriaDTO {
  categoriaID: number;
  edadInicio: number;
  edadFin: number;
  totalParticipantes: number;
}

export interface ReporteDistanciaDTO {
  distanciaID: number;
  nombreDistancia: string;
  totalParticipantesDistancia: number;
}

export interface ReporteEventoDTO {
  eventoID: number;
  nombreEvento: string;
  cantidadInscriptos: number;
  totalRecaudado: number;
  categorias: ReporteCategoriaDTO[];
  distancias: ReporteDistanciaDTO[];
}

export interface ReporteGlobalDTO {
  totalInscriptosGlobal: number; // Total de inscriptos en todos los eventos
  totalRecaudadoGlobal: number; 
  cantidadEventos: number; // Recaudación total de todos los eventos
  eventos: ReporteEventoDTO[];   // Lista de reportes individuales por evento
}
