import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Evento } from 'src/app/interfaces/evento';

const listEventos: Evento[] = [   //le paso la interfaz
  {id: 1, nombre: 'Hydrogen', fecha: new Date(2023, 7, 29)},
  {id: 2, nombre: 'asd', fecha: new Date(2023, 5, 20)},
  {id: 3, nombre: 'fer', fecha: new Date(2023, 8, 21)},
  {id: 4, nombre: 'rfdfv', fecha: new Date(2023, 7, 3)},
  {id: 5, nombre: 'rgegrfe', fecha: new Date(2023, 7, 1)},
  {id: 6, nombre: 'rgedefefe', fecha: new Date(2023, 7, 1)},
];

@Component({
  selector: 'app-listado-evento',
  templateUrl: './listado-evento.component.html',
  styleUrls: ['./listado-evento.component.css']
})
export class ListadoEventoComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nombre', 'fecha'];
  dataSource = new MatTableDataSource<Evento>(listEventos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por pagina"
  }
  

}
