import { Chat, Mensaje } from './chat';
import { Tarea } from './tarea';
// export const CHAT_DATA: Chat[] = [
//   {
//     idChat: 1,
//     foto: '../images/perfil-empty.jpg',
//     remitenteID: 'Ruben Lopez',
//     mensajes: [
//       {
//         id: 1,
//         fechaHoraEnvio: new Date('2024-03-16T00:22:34.368'),
//         contenido: 'Hola',
//         remitenteID: 5,
//         idReceptor: 6,
//       },
//       {
//         id: 2,
//         fechaHoraEnvio: new Date('2024-03-16T00:22:34.368'),
//         contenido: 'Hola',
//         remitenteID: 6,
//         idReceptor: 5,
//       },
//       {
//         id: 3,
//         fechaHoraEnvio: new Date('2024-03-16T00:22:34.368'),
//         contenido: 'Que tal estas?',
//         remitenteID: 5,
//         idReceptor: 6,
//       },
//     ],
//   },
//   {
//     idChat: 2,
//     remitenteID: 'Julia Sanchez',
//     foto: '../images/perfil-empty.jpg',
//     mensajes: [
//       {
//         id: 1,
//         fechaHoraEnvio: new Date('2024-03-16T00:22:34.368'),
//         contenido: 'Acordate...',
//         remitenteID: 2,
//         idReceptor: 6,
//       },
//     ],
//   },
//   {
//     idChat: 2,
//     foto: '../images/perfil-empty.jpg',
//     remitenteID: 'Marta Ramirez',
//     mensajes: [
//       {
//         id: 1,
//         fechaHoraEnvio: new Date('2024-03-16T00:22:34.368'),
//         contenido: 'Acordate...',
//         remitenteID: 1,
//         idReceptor: 6,
//       },
//     ],
//   },
// ];
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
        id: 7,
        email: 'vol@gmail.com',
        nombre: 'Sergio',
        apellido: 'Voluntario',
        telefono: '2222',
      },
      {
        id: 12,
        email: 'mati@gmail.com',
        nombre: 'Matias',
        apellido: 'Carrozo',
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
        id: 13,
        email: 'julio@gmail.com',
        nombre: 'Julio',
        apellido: 'Verne',
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
        id: 14,
        email: 'lauti@gmail.com',
        nombre: 'Lautaro',
        apellido: 'Maximo',
        telefono: '4444',
      },
      {
        id: 15,
        email: 'mario@gmail.com',
        nombre: 'Mario',
        apellido: 'Casas',
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
        id: 16,
        email: 'alex@gmail.com',
        nombre: 'Alex',
        apellido: 'Vulkov',
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
        id: 24,
        email: 'sofa@gmail.com',
        nombre: 'Sofia',
        apellido: 'Buljubasich',
        telefono: '8888',
      },
    ],
  },
];
