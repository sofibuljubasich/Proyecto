using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class UsuarioUpdateDto
    {
       
        public string Email { get; set; }

        public string Password { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

  
        public string? Imagen { get; set; }

        public DateTime? FechaNacimiento { get; set; }
        public string Telefono { get; set; }



       


    }
}
