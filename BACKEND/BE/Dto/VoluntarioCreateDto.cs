using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class VoluntarioCreateDto
    {
       
           
            public string Email { get; set; }
            public string Password { get; set; } = null!;


            public string Nombre { get; set; }

            public string Apellido { get; set; }

            [ForeignKey("Rol")]
            public int RolID { get; set; }
            public string Telefono { get; set; }

            public IFormFile? Imagen { get; set; }   

        }
    }
