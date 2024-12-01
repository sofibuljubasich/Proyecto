using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class EventoDistancia
    {
        
        public int ID { get; set; } 
        
        [ForeignKey("Evento")]
        public int EventoID { get; set; }
        public Distancia Distancia { get; set; }

        public decimal Precio { get; set; }
    }
}
