using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class MensajeCreateDto
    {
      

        [ForeignKey("Usuario")]
        public int remitenteID { get; set; }

        [ForeignKey("Usuario")]
        public int destinatarioID { get; set; }

        public string Contenido { get; set; }

       
    }
}
