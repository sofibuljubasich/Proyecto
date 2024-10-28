export interface Voluntario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface Tarea {
  tareaID: number;
  estado: string;
  descripcion: string;
  fechaHora: Date;
  ubicacion: string;
  eventoID: number;
  voluntarios: Voluntario[];
}

export interface CreateTarea {
  // estado: string;
  descripcion: string;
  fechaHora: Date;
  ubicacion: string;
  eventoID: number;
  voluntarios: Voluntario[];
}
