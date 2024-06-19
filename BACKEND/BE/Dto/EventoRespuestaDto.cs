namespace BE.Dto
{
    public class EventoRespuestaDto
    {
        public EventoDto Evento { get; set; }
        public IEnumerable<CategoriaDto> Categorias { get; set; }
        public IEnumerable<EventoDistanciaDto> Distancias { get; set; }
    }
}
