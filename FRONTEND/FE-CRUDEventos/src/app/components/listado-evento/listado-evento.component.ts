import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Evento } from 'src/app/interfaces/evento';

const listEventos: Evento[] = [];

@Component({
  selector: 'app-listado-evento',
  templateUrl: './listado-evento.component.html',
  styleUrls: ['./listado-evento.component.css'],
})
export class ListadoEventoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'fecha'];
  dataSource = new MatTableDataSource<Evento>(listEventos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
  }
}
