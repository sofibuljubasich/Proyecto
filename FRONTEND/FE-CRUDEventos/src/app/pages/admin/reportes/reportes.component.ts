import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { ReporteEventoDTO, ReporteGlobalDTO } from 'src/app/interfaces/reporte';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'], // Corrige el plural si hay un error
})
export class ReportesComponent implements OnInit {
  eventoId!: number;
  nombreEvento!: string;
  eventoReporte: ReporteEventoDTO | null = null;
  reporteGlobal: ReporteGlobalDTO | null = null;

  // Gráficos de categorías (Evento)
  categoriaChartLabels: string[] = [];
  categoriaChartData: number[] = [];

  // Gráficos de distancias (Evento)
  distanciaChartLabels: string[] = [];
  distanciaChartData: number[] = [];

  // Gráficos del reporte global
  eventosChartLabels: string[] = [];
  participantesPorEventoChartData: number[] = [];
  recaudadoPorEventoChartData: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private aRoute: ActivatedRoute,
    private reporteService: ReporteService
  ) {
    this.aRoute.queryParams.subscribe((params) => {
      this.nombreEvento = params['nombre'] || 'Evento Desconocido'; // Valor por defecto
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // Obtiene el parámetro 'id' si existe
      if (id) {
        this.eventoId = +id;
        this.obtenerReporteEvento(this.eventoId);
      } else {
        this.obtenerReporteGlobal();
      }
    });
  }

  obtenerReporteEvento(eventoId: number): void {
    this.reporteService.obtenerReporteEvento(eventoId).subscribe(
      (reporte: ReporteEventoDTO) => {
        this.eventoReporte = reporte;

        // Asignar datos para los gráficos
        this.categoriaChartLabels = reporte.categorias.map(
          (cat) => `Edad ${cat.edadInicio}-${cat.edadFin}`
        );
        this.categoriaChartData = reporte.categorias.map(
          (cat) => cat.totalParticipantes
        );

        this.distanciaChartLabels = reporte.distancias.map(
          (dist) => `${dist.nombreDistancia} KM`
        );
        this.distanciaChartData = reporte.distancias.map(
          (dist) => dist.totalParticipantesDistancia
        );
      },
      (error) => {
        console.error('Error al obtener el reporte de evento:', error);
      }
    );
  }
  obtenerReporteGlobal(): void {
    this.reporteService.obtenerReporteGlobal().subscribe(
      (reporte) => {
        this.reporteGlobal = reporte;
        this.eventoReporte = null; // Limpiar datos de eventos específicos

        console.log('Reporte recibido:', this.reporteGlobal);
        // Configurar datos para gráficos globales
        this.eventosChartLabels = reporte.eventos.map(
          (evento) => evento.nombreEvento
        );
        this.participantesPorEventoChartData = reporte.eventos.map(
          (evento) => evento.cantidadInscriptos
        );
        this.recaudadoPorEventoChartData = reporte.eventos.map(
          (evento) => evento.totalRecaudado
        );
      },
      (error) => {
        console.error('Error al obtener el reporte global:', error);
      }
    );
  }
}
