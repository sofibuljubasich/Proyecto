using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class TareaVoluntarioDto
    {

        [ForeignKey("Tarea")]
        public int TareaID { get; set; }

        [ForeignKey("Voluntario")]
        public int VoluntarioID { get; set; }
        public string Nombre { get; set; }

        public string Apellido { get; set; }
        public string? Estado { get; set; }
        public string? Comentario { get; set; }
    }
}
