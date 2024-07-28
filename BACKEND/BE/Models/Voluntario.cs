namespace BE.Models
{
    public class Voluntario: Usuario
    {

        //public virtual ICollection<Tarea>? Tareas { get; set; }
        public virtual ICollection<TareaVoluntario> TareaVoluntarios { get; set; } = new List<TareaVoluntario>();


    }
}
