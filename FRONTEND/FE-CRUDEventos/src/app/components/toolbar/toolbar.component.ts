import { Component, HostListener } from '@angular/core';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
})
export class ToolbarBasicExample {
  navbarfixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    // Verificar si el usuario ha hecho scroll hacia abajo
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
