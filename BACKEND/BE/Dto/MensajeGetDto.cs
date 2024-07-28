using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class MensajeGetDto
    {

       
        public int remitenteID { get; set; }

        [ForeignKey("Usuario")]
        public int destinatarioID { get; set; }

        public Usuario Destinatario { get; set; }   

        public string Contenido { get; set; }

        public DateTime FechaHoraEnvio { get; set; }


    }
}
