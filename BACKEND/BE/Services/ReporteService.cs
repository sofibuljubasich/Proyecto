using BE.Dto;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
namespace BE.Services
{
    public class ReporteService : IReporteService
    {
        private readonly EventosContext _context;


        public ReporteService(EventosContext context)
        {
            _context = context;
        }

        public async Task<ReporteEventoDTO> ObtenerReporteEvento(int eventoID)
        {
            var evento = await _context.Eventos
                .Where(e => e.ID == eventoID)
                .Select(e => new ReporteEventoDTO
                {
                    EventoID = e.ID,
                    NombreEvento = e.Nombre,
                    CantidadInscriptos = e.Inscripciones.Count(),
                    TotalRecaudado = e.Inscripciones.Sum(i => i.Precio),
                    Categorias = e.Categorias
                        .Select(c => new ReporteCategoriaDTO
                        {
                            CategoriaID = c.ID,
                            EdadInicio = c.EdadInicio,
                            EdadFin = c.EdadFin,
                            TotalParticipantes = e.Inscripciones
                                .Where(i => i.CategoriaID == c.ID)
                                .Count()
                        })
                        .ToList(),
                    Distancias = e.EventoDistancias
                        .Select(ed => new ReporteDistanciaDTO
                        {
                            DistanciaID = ed.Distancia.ID,
                            NombreDistancia = ed.Distancia.KM,
                            TotalParticipantesDistancia = e.Inscripciones
                                .Where(i => i.DistanciaID == ed.Distancia.ID)
                                .Count()
                        })
                        .ToList()
                })
                .ToListAsync();  // Obtener los datos en memoria

            // Ahora puedes usar FirstOrDefault para obtener un único evento
            return evento.FirstOrDefault();  // Devuelve el primer (y único) evento que cumple la condición
        }
        public async Task<ReporteGlobalDTO> ObtenerReporteGlobal()
        {
            // Obtener todos los eventos y sus datos relacionados
            var eventos = await _context.Eventos
                .Select(e => new ReporteEventoDTO
                {
                    EventoID = e.ID,
                    NombreEvento = e.Nombre,
                    CantidadInscriptos = e.Inscripciones.Count(),
                    TotalRecaudado = e.Inscripciones.Sum(i => i.Precio),
                    Categorias = e.Categorias
                        .Select(c => new ReporteCategoriaDTO
                        {
                            CategoriaID = c.ID,
                            EdadInicio = c.EdadInicio,
                            EdadFin = c.EdadFin,
                            TotalParticipantes = e.Inscripciones
                                .Where(i => i.CategoriaID == c.ID)
                                .Count()
                        })
                        .ToList(),
                    Distancias = e.EventoDistancias
                        .Select(ed => new ReporteDistanciaDTO
                        {
                            DistanciaID = ed.Distancia.ID,
                            NombreDistancia = ed.Distancia.KM,
                            TotalParticipantesDistancia = e.Inscripciones
                                .Where(i => i.DistanciaID == ed.Distancia.ID)
                                .Count()
                        })
                        .ToList()
                })
                .ToListAsync(); // Obtener todos los datos en memoria para cálculos globales

            // Calcular los totales globales
            var totalInscriptosGlobal = eventos.Sum(e => e.CantidadInscriptos);
            var totalRecaudadoGlobal = eventos.Sum(e => e.TotalRecaudado);
            var cantidadEventos = eventos.Count;
            // Crear el reporte global
            var reporteGlobal = new ReporteGlobalDTO
            {
                Eventos = eventos, // Detalles de cada evento
                TotalInscriptosGlobal = totalInscriptosGlobal, // Inscripciones totales
                TotalRecaudadoGlobal = totalRecaudadoGlobal,  // Recaudación total
                 CantidadEventos = cantidadEventos
            };

            return reporteGlobal;
        }


        /*
        public async Task<ReporteGlobalDTO> ObtenerReporteGlobal()
        {
            var reporteGlobal = await _context.Eventos
                .AsNoTracking()
                .Select(e => new ReporteEventoDTO
                {
                    EventoID = e.ID,
                    NombreEvento = e.Nombre,
                    CantidadInscriptos = e.Inscripciones.Count(),
                    TotalRecaudado = e.Inscripciones.Sum(i => i.Precio),
                    CategoriasYDistancias = e.Categorias
                        .Select(c => new ReporteCategoriaDTO
                        {
                            CategoriaID = c.ID,
                            EdadInicio = c.EdadInicio,
                            EdadFin = c.EdadFin,
                            TotalParticipantes = e.Inscripciones
                                .Where(i => i.CategoriaID == c.ID)
                                .Count(),
                            Distancias = e.EventoDistancias
                                .Select(ed => new ReporteDistanciaDTO
                                {
                                    DistanciaID = ed.DistanciaID,
                                    NombreDistancia = ed.Distancia.Nombre,
                                    TotalParticipantesDistancia = e.Inscripciones
                                        .Where(i => i.CategoriaID == c.ID && i.DistanciaID == ed.DistanciaID)
                                        .Count()
                                }).ToList()
                        }).ToList()
                })
                .ToListAsync();

            return new ReporteGlobalDTO { Eventos = reporteGlobal };
        }*/
    }

}
