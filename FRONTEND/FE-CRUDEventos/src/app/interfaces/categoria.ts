export interface Categoria {
    id: number;
    edadInicio: number;
    edadFin: number;
  }
  // Definición de la interfaz para la respuesta completa
  export interface CategoriaResponse {
    
    categorias: Categoria;
    
  }
  
  