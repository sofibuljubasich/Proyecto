using BE.Models;

namespace BE.Dto
{
    public class TareaDto
    {
        public string Descripcion { get; set; } = null!;

        public DateTime FechaHora { get; set; }

        public string Ubicacion { get; set; } = null!;
        public int EventoID { get; set; }
        public virtual ICollection<VoluntarioDto>? Voluntarios { get; set; }


      
    }
}
