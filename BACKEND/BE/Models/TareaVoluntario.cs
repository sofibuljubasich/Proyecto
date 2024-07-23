using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class TareaVoluntario
    {
        public int ID { get; set; }
        
        [ForeignKey("Tarea")]
        public int TareaID { get; set; }

        [ForeignKey("Voluntario")]
        public int VoluntarioID { get; set; }
        public string Comentario { get; set; }

        public Boolean Estado { get; set; }
    }

}
