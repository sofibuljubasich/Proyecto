using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class ComentarioCreateDto
    {
        public DateTime FechaHora { get; set; }

        public string Contenido { get; set; } = null!;

      


        [ForeignKey("Corredor")]
        public int CorredorID { get; set; }


       


        [ForeignKey("Evento")]
        public int EventoID { get; set; }

    }
}
