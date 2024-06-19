using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class InscripcionCreateDto
    {
       

        


        public string? Remera { get; set; }

        public string? FormaPago { get; set; }

        public string? EstadoPago { get; set; }



        public int DistanciaID { get; set; }
   


     

        public int UsuarioID { get; set; }
  

        public int EventoID { get; set; }

    }
}
