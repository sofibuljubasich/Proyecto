import { Categoria } from './evento';

export interface UsuarioEnviado {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rolID: number;
}

export interface Usuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  localidad: string;
  dni: string;
  telefono: string;
  genero: string;
  obraSocial: string;
  imagen: string;
  rolID: number;
}

export interface Corredor {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: string;
  localidad: string;
  dni: string;
  genero: string;
  obraSocial: string;
}

export interface CorredorUpdate {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: string;
  localidad: string;
  dni: string;
  genero: string;
  obraSocial: string;
  imagen: string;
}
export interface Inscrito {
  id: number;
  nombre: string;
  apellido: string;
  fecha: string;
  dorsal: number;
  remera: string;
  formaPago: string;
  estadoPago: string;
  posicion: number | null;
  tiempo: string | null;
  precio: number;
  categoria: Categoria;
  distancia: Distancia;
  corredor: Corredor;
  acreditado: boolean;
}
export interface Distancia {
  id: number;
  km: number;
}

export interface General {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rolID: number;
  password: string;
}
// export interface VoluntarioNuevo {
//   email: string;
//   nombre: string;
//   apellido: string;
//   telefono: string;

//   password: string;
// }
