namespace BE.Models
{
    public class Voluntario: Usuario
    {

        public virtual ICollection<Tarea>? Tareas { get; set; }  

    }
}
