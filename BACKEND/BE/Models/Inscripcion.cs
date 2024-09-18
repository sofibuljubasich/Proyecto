using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Inscripcion
    {
        public int ID { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }

        public int Dorsal { get; set; }

        public string? Remera { get; set; } 

        public string? FormaPago { get; set; } 

        public string? EstadoPago { get; set; } 

        public string? PosicionGeneral { get; set; }
        public string? PosicionCategoria { get; set; }

        public int? Tiempo { get; set; }

        [ForeignKey("Distancia")]

        public int DistanciaID { get; set; }    
        public virtual Distancia Distancia { get; set; }


        [ForeignKey("Corredor")]

        public int UsuarioID { get; set; }
        public virtual Corredor Corredor { get; set; }

        [ForeignKey("Evento")]
        public int EventoID { get; set; }
        public virtual Evento Evento { get; set; }


        [ForeignKey("Categoria")]
        public int CategoriaID { get; set; }

        public Boolean Acreditado { get; set; } = false;

        public decimal Precio { get; set; }   

        public int? NroTransaccion { get; set; }  
        
        //public int NroKit { get; set; } //Generar automatico, imprimir todos los numeros y su corredor
    }
}
