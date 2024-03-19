using System.Text.Json.Serialization;

namespace BE.Models
{
    public class Categoria
    {
        public int ID { get; set; }

        public int EdadInicio { get; set; }

        public int EdadFin { get; set; }

        [JsonIgnore]
        public ICollection<Evento> Eventos { get; set; }
    }
}
