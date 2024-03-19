using Azure;
using System.Text.Json.Serialization;

namespace BE.Models
{
    public class Distancia
    {
        public int ID { get; set; }

        public int KM { get; set; }


        public virtual ICollection<EventoDistancia> EventoDistancias { get; set; }

        [JsonIgnore]
        public virtual ICollection<Inscripcion> Inscripciones { get; set; } 
    }
}
