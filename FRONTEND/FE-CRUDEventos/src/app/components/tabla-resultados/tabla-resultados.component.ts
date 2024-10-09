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
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.css',
})
export class TablaResultadosComponent {
  @Input() eventoId!: number;
  
   resultados: TablaResultados[] = [];
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
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _eventoService: EventoService,
    private _userService: UserService,
  ) {}

  ngOnInit() {
     this._eventoService
       .getResultados(this.eventoId)
       .subscribe((data: any) => {
        console.log(data)
        this.resultados = data.map((res:any) => {
              return {
                dorsal: res.dorsal,
                nombre: `${res.corredor.nombre} ${res.corredor.apellido}`,
                genero: res.corredor.genero,
                distancia: res.distancia.km,
                categoria: `${res.categoria.edadInicio} - ${res.categoria.edadFin}`,
                tiempo: res.tiempo,
                posicionGral: res.posicionGeneral,
                posicionCategoria: res.posicionCategoria,
              };
            })
            this.dataSource.data =this.resultados;})
      
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
