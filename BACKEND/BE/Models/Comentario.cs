using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Comentario
    {
        public int ID { get; set; } 
        public DateTime FechaHora { get; set; }

        public string Contenido { get; set; } = null!;

        public virtual Usuario Corredor { get; set; }


        [ForeignKey("Corredor")]
        public int CorredorID { get; set; } 


        public virtual Evento Evento { get; set; }


        [ForeignKey("Evento")]
        public int EventoID { get; set; }
        
       



    }
}
