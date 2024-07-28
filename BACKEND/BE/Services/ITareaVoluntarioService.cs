using BE.Models;

namespace BE.Services
{
    public interface ITareaVoluntarioService
    {
        Task CreateTareaVoluntario(int tareaID, List<Voluntario> voluntarios);

        Task<List<Voluntario>> GetVoluntariosByTarea(int tareaID);

        Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID);
        Task<List<Tarea>> GetTareasByEventoVoluntario(int eventoID, int voluntarioID);
    }
}
