using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class Corredor: Usuario
    {
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? FechaNacimiento { get; set; }

        public string Localidad { get; set; }

        public string Dni { get; set; }

        public string Genero { get; set; }

        public string ObraSocial { get; set; }

        public virtual ICollection<Inscripcion> Inscripciones { get; set; }
    }
}
