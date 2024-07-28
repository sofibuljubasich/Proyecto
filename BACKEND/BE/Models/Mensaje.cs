using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Mensaje
    {
        public int ID { get; set; }

        [ForeignKey("Usuario")]
        public int remitenteID { get; set; }

        [ForeignKey("Usuario")]
        public int destinatarioID { get; set; }

        public string Contenido { get; set; } 

        public DateTime FechaHoraEnvio { get; set; }

        public Boolean EstadoLeido { get; set; } 



        
    }
}
