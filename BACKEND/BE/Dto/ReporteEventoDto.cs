namespace BE.Dto
{
    
       
    public class ReporteEventoDTO
    {
        public int EventoID { get; set; }
        public string NombreEvento { get; set; }
        public int CantidadInscriptos { get; set; }
        public decimal TotalRecaudado { get; set; }
        public List<ReporteCategoriaDTO> Categorias { get; set; }
        public List<ReporteDistanciaDTO> Distancias { get; set; }
    
    }

    public class ReporteCategoriaDTO
    {
        public int CategoriaID { get; set; }
        public int EdadInicio { get; set; }
        public int EdadFin { get; set; }
        public int TotalParticipantes { get; set; }
  
    }

    public class ReporteDistanciaDTO
    {
        public int DistanciaID { get; set; }
        public int NombreDistancia { get; set; }
        public int TotalParticipantesDistancia { get; set; }
    }




}
