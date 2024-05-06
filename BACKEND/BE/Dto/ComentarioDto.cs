using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class ComentarioDto
    {
        public int ID { get; set; }
        public DateTime FechaHora { get; set; }

        public string Contenido { get; set; } = null!;

        public string NombreCorredor { get; set; } = null!; 

        [ForeignKey("Corredor")]
        public int CorredorID { get; set; }





    }
}
