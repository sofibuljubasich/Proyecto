using BE.Models;

namespace BE.Interfaces
{
    public interface ITareaRepository
    {

        Task<List<Tarea>> GetTareas();

        Task<Tarea> GetTarea(int tareaID);

        Task Delete(Tarea tarea);

        Task<Tarea> Create(Tarea tarea);

        Task Update(Tarea tarea);


        Task<List<Tarea>> GetTareasByEvento(int eventoID);


        Task<List<Voluntario>> GetVoluntariosByTarea(int tareaID);

    }
}
