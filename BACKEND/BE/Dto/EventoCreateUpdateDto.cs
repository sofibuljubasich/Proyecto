using BE.Models;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class EventoCreateUpdateDto
    {

        public string Nombre { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }

        public string Lugar { get; set; }

        public string Estado { get; set; }

        public byte[]? Imagen { get; set; }

        public List<Distancia>? Distancias { get; }
        public int TipoID { get; set; }


    }
}