using BE.Models;

namespace BE.Dto
{
    public class TareaCreateUpdateDto
    {
        public string Descripcion { get; set; } = null!;

        public DateTime FechaHora { get; set; }

        public string Ubicacion { get; set; } = null!;

        public virtual ICollection<int>? VoluntariosID { get; set; }


        public int EventoID { get; set; }
    }
}
