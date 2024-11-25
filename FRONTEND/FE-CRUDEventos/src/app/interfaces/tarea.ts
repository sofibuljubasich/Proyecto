export interface Voluntario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface TareaVoluntarios {
  tareaID: number;
  voluntarioID: string;
  estado: string;
  comentario: string;
}

export interface Tarea {
  id: number;
  descripcion: string;
  fechaHora: Date;
  ubicacion: string;
  tareaVoluntarios: TareaVoluntarios[];
}

export interface CreateTarea {
  // estado: string;
  descripcion: string;
  fechaHora: Date;
  ubicacion: string;
  eventoID: number;
  voluntarios: Voluntario[];
}
