using BE.Models;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class KitDto
    {

        


        public virtual CorredorGetDto Corredor { get; set; }
        public virtual DistanciaDto? Distancia { get; set; }
        public int Dorsal { get; set; }

        public string? Remera { get; set; }

    }
}
