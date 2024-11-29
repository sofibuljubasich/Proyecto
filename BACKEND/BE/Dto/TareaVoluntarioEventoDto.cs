using BE.Models;

namespace BE.Dto
{
    public class TareaVoluntarioEventoDto
    {
        public TareaGetDto tarea { get; set; }

        public string? Comentario { get; set; }
        public string? Estado { get; set; }

        public string VoluntarioNombre { get; set; }

        public string VoluntarioApellido { get; set; }
    }
}
