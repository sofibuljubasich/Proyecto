export interface Distancia {
    id: number;
    distanciaID: number;
    km: number;
    precio: number;
  }
// Definición de la interfaz para la respuesta completa
  export interface DistanciaResponse {
    
    distancia: Distancia;
    
  }
  
  
