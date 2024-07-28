using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class RegisterUserDto
    {
   
        public string Email { get; set; }

        public string Password { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public IFormFile? Imagen { get; set; }


        public string Telefono { get; set; }



        [ForeignKey("Rol")]
        public int RolID { get; set; }

    }
}
