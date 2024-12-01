using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class EventoUpdateDto
    {

        public string Nombre { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }

        public string Lugar { get; set; }
     // public TimeOnly Hora { get; set; }

        public TimeSpan Hora { get; set; }
        public string Estado { get; set; }

        public IFormFile? Imagen { get; set; }





        public List<EventoDistanciaUpdateDto> EventoDistancias { get; set; }


        public  List<int> CategoriasID { get; set; }




        //       public int TipoID { get; set; }
    }
}
