namespace BE.Dto
{
    public class VoluntarioCreateDto
    {
       
           
            public string Email { get; set; }
            public string Password { get; set; } = null!;


            public string Nombre { get; set; }

            public string Apellido { get; set; }



            public string Telefono { get; set; }

        }
    }
