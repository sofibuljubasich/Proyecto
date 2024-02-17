using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class TareaCreateUpdateDto
    {
        public string Descripcion { get; set; } = null!;

        public DateTime FechaHora { get; set; }

        public string Ubicacion { get; set; } = null!;



        public int UsuarioID { get; set; }
        public int EventoID { get; set; }
    }
}
