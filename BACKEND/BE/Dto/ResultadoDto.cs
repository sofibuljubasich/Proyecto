using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class ResultadoDto
    {
        public int ID { get; set; }

       
        public int Dorsal { get; set; }


        // Ver la categoria
        // Posicion categoria

        public string Posicion { get; set; }

        public int Tiempo { get; set; }

        [ForeignKey("Distancia")]

        public int DistanciaID { get; set; }
        public virtual Distancia Distancia { get; set; }


        [ForeignKey("Corredor")]

        public int UsuarioID { get; set; }
        public virtual Usuario Corredor { get; set; }

       
    }
}
