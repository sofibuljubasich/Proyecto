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

        public string? Posicion { get; set; }

        public int Tiempo { get; set; }

        [ForeignKey("Distancia")]

        public int DistanciaID { get; set; }
#pragma warning disable CS8618 // Un campo que no acepta valores NULL debe contener un valor distinto de NULL al salir del constructor. Considere la posibilidad de declararlo como que admite un valor NULL.
        public virtual Distancia Distancia { get; set; }
#pragma warning restore CS8618 // Un campo que no acepta valores NULL debe contener un valor distinto de NULL al salir del constructor. Considere la posibilidad de declararlo como que admite un valor NULL.


        [ForeignKey("Corredor")]

        public int UsuarioID { get; set; }
        public virtual Usuario Corredor { get; set; }

       
    }
}
