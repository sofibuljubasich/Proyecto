using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class CorredorGetDto
    {
        public int ID { get; set; }
        public string Email { get; set; }


        public string Nombre { get; set; }

        public string Apellido { get; set; }



        public string Telefono { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? FechaNacimiento { get; set; }

        public string Localidad { get; set; }

        public string Dni { get; set; }

        public string Genero { get; set; }

        public string ObraSocial { get; set; }

        public string Imagen { get; set; }
    }
}
