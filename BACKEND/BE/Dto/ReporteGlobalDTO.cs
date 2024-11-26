namespace BE.Dto
{
    public class ReporteGlobalDTO
    {
        public List<ReporteEventoDTO> Eventos { get; set; } // Lista de reportes por evento
        public int TotalInscriptosGlobal { get; set; } // Inscripciones globales
        public decimal TotalRecaudadoGlobal { get; set; } // Recaudación global

        public int CantidadEventos { get; set; }
    }
}
