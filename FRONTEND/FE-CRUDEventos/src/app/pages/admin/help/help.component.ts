import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpAComponent {
  faqs = [
    {
      question: '¿Cómo puedo registrar usuarios Inscriptores y/o Voluntarios?',
      answer:
        'Puedes registra usuarios con rol Inscriptor y/o Voluntario haciendo click en la solapa de "Usuarios" en la parte superior, seleccionando "Agregar usuario" y completando el formulario.',
      expanded: false,
    },
    {
      question: '¿Cómo inhabilito un evento?',
      answer:
        'Para inhabilitar un evento, deberás seleccionar el botón de "Activo" del Evento deseado',
      expanded: false,
    },
    {
      question: '¿Cómo cargo los resultados de un evento?',
      answer:
        'En la página de inicio dentro del evento deseado, seleccionar el botón "Resultados". Allí, podrás cargar el archivo en formato Excel con los resultados del evento. El archivo debe tener la información en columnas con los siguientes nombres: "Dorsal", "Posicion Categoria", "Posicion General", "Tiempo".',
      expanded: false,
    },
    {
      question: '¿Cómo exporto la información de los kits de un evento?',
      answer: 'Debes ingresar a la sección de inscriptos del evento deseado y clickear el botón "Descargar" para obtener la información de los kits para los inscriptos',
      expanded: false,
    },
  ];

  // Alterna el estado de expansión de una pregunta
  toggleAnswer(faq: any): void {
    faq.expanded = !faq.expanded;
  }
}
