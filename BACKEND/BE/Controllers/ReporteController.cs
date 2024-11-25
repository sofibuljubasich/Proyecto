namespace BE.Controllers
{
    using global::BE.Dto;
    using global::BE.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    namespace BE.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ReportesController : ControllerBase
        {
            private readonly IReporteService _reporteService;  // Interfaz para los servicios de reporte

            public ReportesController(IReporteService reporteService)
            {
                _reporteService = reporteService;
            }

            // Endpoint para obtener el reporte de un solo evento
            [HttpGet("evento/{eventoID}")]
            public async Task<ActionResult<ReporteEventoDTO>> ObtenerReportePorEvento(int eventoID)
            {
                // Llamamos al servicio que obtiene el reporte de un evento específico
                var reporte = await _reporteService.ObtenerReporteEvento(eventoID);

                // Verificamos si el reporte es nulo o no existe
                if (reporte == null)
                {
                    return NotFound(new { mensaje = "Evento no encontrado" });
                }

                return Ok(reporte);  // Retornamos el reporte con un código 200
            }
            // Endpoint para el reporte global
            [HttpGet("global")]
            public async Task<ActionResult<ReporteGlobalDTO>> ObtenerReporteGlobal()
            {
                var reporteGlobal = await _reporteService.ObtenerReporteGlobal();
                return Ok(reporteGlobal);
            }
        }
    }

}
