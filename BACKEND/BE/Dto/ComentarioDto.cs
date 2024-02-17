using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class ComentarioDto
    {
        public int ID { get; set; }
        public DateTime FechaHora { get; set; }

        public string Contenido { get; set; } = null!;

        public virtual Usuario Corredor { get; set; }


        [ForeignKey("Corredor")]
        public int CorredorID { get; set; }





    }
}
