import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-ver-resultados',
  standalone: false,
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css',
})
export class VerResultadosComponent {
  eventoId!: number;

  constructor(private aRoute: ActivatedRoute, private router: Router) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
