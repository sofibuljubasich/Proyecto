import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpIComponent {
  faqs = [
    {
      question: '¿Cómo registro una inscripción?',
      answer:
        'En el menú principal seleccionar el evento en el cuál se quiere registrar una nueva inscripción. Allí, seleccionar el botón "Agregar Participante" y completar con los datos del corredor para completar la inscripción.',
      expanded: false,
    },
    {
      question: '¿Qué hago si el corredor a inscribir no tiene cuenta?',
      answer:
        'En este caso, tienes que proceder de la misma manera que una inscripción con un usuario registrado pero en vez de buscar el corredor, deberás seleccionar el botón "Crear Usuario" y proceder a crearle una cuenta al corredor.',
      expanded: false,
    },
    {
      question: '¿Cómo actualizo el estado del pago de una inscripción?',
      answer:
        'En el menú principal seleccionar el evento en el cuál se quiere modificar la inscripción. Allí, buscar el corredor deseado y mediante el desplegable de la columna "Estado del Pago" seleccionar el estado deseado.',
      expanded: false,
    },
    {
      question: '¿Cuáles son los métodos de pago disponibles?',
      answer:
        'Actualmente aceptamos pagos en efectivo acercandote a alguno de los puntos de registro o a través de MercadoPago',
      expanded: false,
    },
    {
      question: '¿Cómo puedo recuperar mi contraseña?',
      answer:
        'En la página de inicio de sesión, selecciona "Recuperar contraseña" y sigue las instrucciones para restablecerla.',
      expanded: false,
    },
  ];

  // Alterna el estado de expansión de una pregunta
  toggleAnswer(faq: any): void {
    faq.expanded = !faq.expanded;
  }
}
