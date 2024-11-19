import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  faqs = [
    {
      question: '¿Cómo puedo registrarme?',
      answer:
        'Puedes registrarte haciendo click en el botón registrarse en la parte superior derecha, completando el formulario y confirmando tu correo electrónico.',
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
