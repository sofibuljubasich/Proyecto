using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class InscripcionDto
    {
        public int ID { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }

        public int Dorsal { get; set; }

        public string? Remera { get; set; }

        public string? FormaPago { get; set; }

        public string? EstadoPago { get; set; }

        public string? Posicion { get; set; }

        public string? Tiempo { get; set; }

        public decimal Precio { get; set; } 

        //[ForeignKey("Distancia")]

        //  public int DistanciaID { get; set; }

        public virtual DistanciaDto? Distancia { get; set; }


        //[ForeignKey("Corredor")]

        public virtual Categoria Categoria { get; set;}

        //public int UsuarioID { get; set; }

        public virtual CorredorGetDto Corredor { get; set; }

        //[ForeignKey("Evento")]
        //        public int EventoID { get; set; }

        public Boolean Acreditado { get; set; } = false;

    }
}
