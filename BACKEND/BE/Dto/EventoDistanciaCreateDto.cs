using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class EventoDistanciaCreateDto
    {
       

        public int  DistanciaID { get; set; }

        public decimal Precio { get; set; }
    }
}
