using BE.Models;

namespace BE.Repository
{
    public interface ICorredorRepository
    {

        Task<Corredor> GetCorredor(int id);

       

        Task<Corredor> CreateCorredor(Corredor corredor);
        Task UpdateCorredor(Corredor corredor);

        bool CheckIfUserExists(string email);
        Corredor? Validate(string userEmail, string password);
    }
}
