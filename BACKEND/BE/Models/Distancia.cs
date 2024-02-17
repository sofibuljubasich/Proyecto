using Azure;

namespace BE.Models
{
    public class Distancia
    {
        public int ID { get; set; }

        public int KM { get; set; }

        public List<Evento>? Eventos { get; }


        public virtual ICollection<Inscripcion> Inscripciones { get; set; } 
    }
}
