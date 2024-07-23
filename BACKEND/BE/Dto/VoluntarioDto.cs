using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class VoluntarioDto
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } = null!;


        public string Nombre { get; set; }

        public string Apellido { get; set; }



        public string Telefono { get; set; }

     

      
    }
}
