using System.Collections;

namespace BE.Models
{
    public class TipoEvento
    {
        public int ID { get; set; }

        public string Descripcion { get; set; } = null!;

        public ICollection<Evento>Eventos { get; set; } 
    }
}
