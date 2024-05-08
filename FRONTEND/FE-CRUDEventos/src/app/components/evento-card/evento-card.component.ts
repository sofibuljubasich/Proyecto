import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'evento-card',
  templateUrl: 'evento-card.component.html',
  styleUrls: ['evento-card.component.css'],
})
export class EventoCardComponent implements OnInit, AfterViewInit {

  constructor(private _eventoService: EventoService) { }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
  
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }
}
