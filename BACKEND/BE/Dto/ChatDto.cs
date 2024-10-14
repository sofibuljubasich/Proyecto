using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class ChatDto
    {
      
       // public int IDChat { get; set; } 
        [ForeignKey("Usuario")]
        public int RemitenteID { get; set; }

        [ForeignKey("Usuario")]
        public int DestinatarioID { get; set; }

        public Usuario Destinatario { get; set; }    
        public int CantidadSinLeer { get; set; }

    }
}
