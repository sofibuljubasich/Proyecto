using BE.Models;

namespace BE.Interfaces
{
    public interface IRolRepository
    {
        Task<List<Rol>> GetRoles();


        Task<Rol> GetRol(int ID);
        Task<Rol> Create(Rol rol);

        Task Update(Rol rol);

        Task Delete(Rol rol);
    }
}
