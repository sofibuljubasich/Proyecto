import { Chat, Mensaje } from './chat';
import { Tarea } from './tarea';
export const CHAT_DATA: Chat[] = [
  {
    idChat: 1,
    foto: '../images/perfil-empty.jpg',
    idEmisor: 'Ruben Lopez',
    mensajes: [
      {
        id: 1,
        fechaHora: new Date('2024-03-16T00:22:34.368'),
        contenido: 'Hola',
        idEmisor: 5,
        idReceptor: 6,
      },
      {
        id: 2,
        fechaHora: new Date('2024-03-16T00:22:34.368'),
        contenido: 'Hola',
        idEmisor: 6,
        idReceptor: 5,
      },
      {
        id: 3,
        fechaHora: new Date('2024-03-16T00:22:34.368'),
        contenido: 'Que tal estas?',
        idEmisor: 5,
        idReceptor: 6,
      },
    ],
  },
  {
    idChat: 2,
    idEmisor: 'Julia Sanchez',
    foto: '../images/perfil-empty.jpg',
    mensajes: [
      {
        id: 1,
        fechaHora: new Date('2024-03-16T00:22:34.368'),
        contenido: 'Acordate...',
        idEmisor: 2,
        idReceptor: 6,
      },
    ],
  },
  {
    idChat: 2,
    foto: '../images/perfil-empty.jpg',
    idEmisor: 'Marta Ramirez',
    mensajes: [
      {
        id: 1,
        fechaHora: new Date('2024-03-16T00:22:34.368'),
        contenido: 'Acordate...',
        idEmisor: 1,
        idReceptor: 6,
      },
    ],
  },
];
export const TASK_DATA: Tarea[] = [
  {
    tareaID: 1,
    estado: 'Pendiente',
    descripcion: 'Armado Kit',
    fechaHora: new Date('2024-03-16T00:22:34.368'),
    ubicacion: 'Centro',
    eventoID: 5,
    voluntarios: [
      {
        id: 3,
        email: 'vol@gmail.com',
        nombre: 'Maria',
        apellido: 'Perez',
        telefono: '2222',
      },
      {
        id: 4,
        email: 'delfina@gmail.com',
        nombre: 'delfina',
        apellido: 'maria',
        telefono: '5555',
      },
    ],
  },
  {
    tareaID: 2,
    estado: 'Realizada',
    descripcion: 'Montaje de escenario',
    fechaHora: new Date('2024-03-16T08:00:00.000'),
    ubicacion: 'Plaza Central',
    eventoID: 5,
    voluntarios: [
      {
        id: 5,
        email: 'juan@gmail.com',
        nombre: 'Juan',
        apellido: 'Garcia',
        telefono: '3333',
      },
    ],
  },
  {
    tareaID: 3,
    estado: 'Pendiente',
    descripcion: 'Control de accesos',
    fechaHora: new Date('2024-03-16T09:00:00.000'),
    ubicacion: 'Entrada Principal',
    eventoID: 5,
    voluntarios: [
      {
        id: 6,
        email: 'luis@gmail.com',
        nombre: 'Luis',
        apellido: 'Martinez',
        telefono: '4444',
      },
      {
        id: 7,
        email: 'ana@gmail.com',
        nombre: 'Ana',
        apellido: 'Lopez',
        telefono: '6666',
      },
    ],
  },
  {
    tareaID: 4,
    estado: 'Pendiente',
    descripcion: 'Reparto de folletería',
    fechaHora: new Date('2024-03-16T10:00:00.000'),
    ubicacion: 'Stand Informativo',
    eventoID: 5,
    voluntarios: [
      {
        id: 8,
        email: 'carlos@gmail.com',
        nombre: 'Carlos',
        apellido: 'Fernandez',
        telefono: '7777',
      },
    ],
  },
  {
    tareaID: 5,
    estado: 'Realizada',
    descripcion: 'Supervisión técnica',
    fechaHora: new Date('2024-03-16T11:00:00.000'),
    ubicacion: 'Sala de Control',
    eventoID: 5,
    voluntarios: [
      {
        id: 9,
        email: 'marta@gmail.com',
        nombre: 'Marta',
        apellido: 'Sanchez',
        telefono: '8888',
      },
    ],
  },
];
