using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Tarea
    {
        public int ID { get; set; }

        public string Descripcion { get; set; } = null!;

        public DateTime FechaHora { get; set; }

        public string Ubicacion { get; set; } = null!;
        //public virtual ICollection<Voluntario> Voluntarios { get; set; }

  

        [ForeignKey("Evento")]
        public int EventoID { get; set; }

        public virtual Evento Evento { get; set; }
        public virtual ICollection<TareaVoluntario> TareaVoluntarios { get; set; }


    }
}
