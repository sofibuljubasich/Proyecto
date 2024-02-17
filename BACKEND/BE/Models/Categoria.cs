namespace BE.Models
{
    public class Categoria
    {
        public int ID { get; set; }

        public int EdadInicio { get; set; }

        public int EdadFin { get; set; }

        public ICollection<Evento> Eventos { get; set; }
    }
}
