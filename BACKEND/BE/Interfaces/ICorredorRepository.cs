using BE.Models;

namespace BE.Repository
{
    public interface ICorredorRepository
    {

        Task CargarImagen(string ImagenURL, int corredorID);
        Task<Corredor> GetCorredor(int id);
        Task<bool> ExisteCorredorConDNI(string dni);
        Task<Corredor> GetCorredorByDni(string dni);
        Task<Corredor> CreateCorredor(Corredor corredor);
        Task UpdateCorredor(Corredor corredor);

        bool CheckIfUserExists(string email);
        Corredor? Validate(string userEmail, string password);
    }
}
