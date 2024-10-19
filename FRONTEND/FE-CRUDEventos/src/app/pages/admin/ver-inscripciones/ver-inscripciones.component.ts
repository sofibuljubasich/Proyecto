import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Inscrito } from 'src/app/interfaces/usuario';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-ver-inscripciones',
  templateUrl: './ver-inscripciones.component.html',
  styleUrl: './ver-inscripciones.component.css',
})
export class VerInscripcionesComponent {
  eventoId!: number;

  // resultados: TablaResultados[] = [];
  displayedColumns: string[] = [
    'nro',
    'mail',
    'genero',
    'distancia',
    'categoria',
    'estado',
    'metodo',
    'entregaKit',
  ];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private _inscripcionService: InscripcionService
  ) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getInscriptos();
  }
  getInscriptos(): void {
    console.log(this.eventoId);
    this._eventoService
      .getInscriptos(this.eventoId)
      .subscribe((data: Inscrito[]) => {
        const transformedData = data.map((inscrito, index) => ({
          nro: index + 1,
          mail: inscrito.corredor.email,
          genero: inscrito.corredor.genero,
          distancia: `${inscrito.distancia.km} km`,
          categoria: `${inscrito.categoria.edadInicio} - ${inscrito.categoria.edadFin}`, // Asumiendo que "categoria" se refiere a la remera
          estado: this.normalizeEstadoPago(inscrito.estadoPago),
          metodo: inscrito.formaPago,
          entregaKit: inscrito.acreditado,
          id: inscrito.id,
        }));
        this.dataSource.data = transformedData;
      });
  }

  descarga() {
    this._eventoService.descargar(this.eventoId).subscribe((data: Blob) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Inscriptos_Evento_${this.eventoId}.xlsx`; // Nombre del archivo descargado
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  normalizeEstadoPago(estadoPago: string): string {
    return estadoPago.toLowerCase() === 'pendiente' ? 'Pendiente' : estadoPago;
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
