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

        public string? PosicionGeneral { get; set; }

        public string? PosicionCategoria { get; set; }

        public string? Tiempo { get; set; }

        [ForeignKey("Distancia")]

        public int DistanciaID { get; set; }
        public virtual Distancia Distancia { get; set; }


        [ForeignKey("Corredor")]

        public int UsuarioID { get; set; }
        public virtual Corredor Corredor { get; set; }


        public virtual Categoria Categoria { get; set; }


    }
}
