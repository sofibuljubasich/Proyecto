export interface Voluntario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface TareaVoluntario {
  idTarea: number;
  idVol: number;
  estado: string;
  comentario: string;
}

export interface Tarea {
  id: number;
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
