using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class TareaVoluntario
    {
            
        [ForeignKey("Tarea")]
        public int TareaID { get; set; }
        public Tarea Tarea { get; set; }    

        [ForeignKey("Voluntario")]
        public int VoluntarioID { get; set; }
        public Voluntario Voluntario { get; set; }

        public string? Estado { get; set; }
        public string? Comentario { get; set; }
    }
}
