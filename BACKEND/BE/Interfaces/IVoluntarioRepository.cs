using BE.Models;

namespace BE.Interfaces
{
    public interface IVoluntarioRepository
    {

        Task<Voluntario> Get(int voluntarioID);
        Task<List<Voluntario>> GetAll();

        Task<Voluntario> Create(Voluntario voluntario);
        Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID);

        Task<List<Voluntario>> GetVoluntarios(ICollection<int> voluntariosIDs);

        //Task UpdateUsuario(Usuario usuario);

        Task Delete(Voluntario voluntario);
        bool CheckIfExists(string email);

        //TAREA COMPLETADA

    }
}
