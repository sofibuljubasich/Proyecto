import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Inscrito } from 'src/app/interfaces/usuario';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-lista-inscriptos',
  templateUrl: './lista-inscriptos.component.html',
  styleUrl: './lista-inscriptos.component.css',
})
export class ListaInscriptosComponent {
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
          categoria: inscrito.remera, // Asumiendo que "categoria" se refiere a la remera
          estado: this.normalizeEstadoPago(inscrito.estadoPago),
          metodo: inscrito.formaPago,
          entregaKit: inscrito.acreditado,
          id: inscrito.id,
        }));
        this.dataSource.data = transformedData;
      });
  }
  normalizeEstadoPago(estadoPago: string): string {
    return estadoPago.toLowerCase() === 'pendiente' ? 'Pendiente' : estadoPago;
  }

  onCheckboxChange(element: any): void {
    const updatedAcreditado = !element.entregaKit;
    element.entregaKit = updatedAcreditado;
    this._inscripcionService.acreditar(element.id, updatedAcreditado).subscribe(
      () => {
        console.log('Estado actualizado');
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }
  onEstadoChange(element: any): void {
    const updatedEstado = element.estado;
    console.log(updatedEstado);
    this._inscripcionService
      .updateEstadoPago(element.id, updatedEstado)
      .subscribe(
        () => {
          console.log('Estado de pago actualizado');
        },
        (error) => {
          console.error('Error al actualizar estado de pago:', error);
        }
      );
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
