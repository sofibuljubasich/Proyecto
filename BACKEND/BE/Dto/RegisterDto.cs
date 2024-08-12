using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class RegisterDto
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Nombre { get; set; } = null!;

        public string Apellido { get; set; } = null!;
      

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? FechaNacimiento { get; set; }

        public string Localidad { get; set; }

        public string Dni { get; set; }

        public string Telefono { get; set; }

        public string Genero { get; set; }

        public string ObraSocial { get; set; }

        public IFormFile? Imagen { get; set; }

        
        //public string? Imagen { get; set; }

    }
}