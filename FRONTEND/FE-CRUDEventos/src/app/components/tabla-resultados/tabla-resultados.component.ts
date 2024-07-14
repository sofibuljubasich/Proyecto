import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TablaResultados } from 'src/app/interfaces/tabla';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Comentario } from 'src/app/interfaces/comentario';
import { EventoService } from 'src/app/services/evento.service';

const ELEMENT_DATA: TablaResultados[] = [
  {
    dorsal: 1,
    nombre: 'Juan Perez',
    genero: 'Masculino',
    distancia: 10,
    categoria: 'Senior',
    tiempo: '00:45:23',
    posicionGral: 1,
    posicionCategoria: 1,
  },
  {
    dorsal: 2,
    nombre: 'Ana Gomez',
    genero: 'Femenino',
    distancia: 10,
    categoria: 'Senior',
    tiempo: '00:47:10',
    posicionGral: 2,
    posicionCategoria: 1,
  },
  {
    dorsal: 3,
    nombre: 'Luis Martinez',
    genero: 'Masculino',
    distancia: 5,
    categoria: 'Junior',
    tiempo: '00:22:45',
    posicionGral: 3,
    posicionCategoria: 1,
  },
  {
    dorsal: 4,
    nombre: 'Maria Rodriguez',
    genero: 'Femenino',
    distancia: 5,
    categoria: 'Junior',
    tiempo: '00:24:30',
    posicionGral: 4,
    posicionCategoria: 1,
  },
  {
    dorsal: 5,
    nombre: 'Carlos Sanchez',
    genero: 'Masculino',
    distancia: 21,
    categoria: 'Master',
    tiempo: '01:30:15',
    posicionGral: 5,
    posicionCategoria: 1,
  },
  {
    dorsal: 6,
    nombre: 'Lucia Fernandez',
    genero: 'Femenino',
    distancia: 21,
    categoria: 'Master',
    tiempo: '01:35:20',
    posicionGral: 6,
    posicionCategoria: 1,
  },
  {
    dorsal: 7,
    nombre: 'Jorge Gomez',
    genero: 'Masculino',
    distancia: 10,
    categoria: 'Veterano',
    tiempo: '00:50:12',
    posicionGral: 7,
    posicionCategoria: 1,
  },
  {
    dorsal: 8,
    nombre: 'Sofia Morales',
    genero: 'Femenino',
    distancia: 10,
    categoria: 'Veterano',
    tiempo: '00:53:45',
    posicionGral: 8,
    posicionCategoria: 1,
  },
  {
    dorsal: 9,
    nombre: 'Diego Lopez',
    genero: 'Masculino',
    distancia: 42,
    categoria: 'Elite',
    tiempo: '02:45:30',
    posicionGral: 9,
    posicionCategoria: 1,
  },
  {
    dorsal: 10,
    nombre: 'Paula Gutierrez',
    genero: 'Femenino',
    distancia: 42,
    categoria: 'Elite',
    tiempo: '03:00:10',
    posicionGral: 10,
    posicionCategoria: 1,
  },
];

@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.css',
})
export class TablaResultadosComponent {
  @Input() eventoId!: number;
  // resultados: TablaResultados[] = [];
  displayedColumns: string[] = [
    'dorsal',
    'nombre',
    'genero',
    'distancia',
    'categoria',
    'tiempo',
    'posicionGral',
    'posicionCategoria',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _eventoService: EventoService
  ) {}

  ngOnInit() {
    // this._eventoService
    //   .getResultados(this.eventoId)
    //   .subscribe((data: TablaResultados[]) => {
    //     this.resultados = data;
    //   });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
