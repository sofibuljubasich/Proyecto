using BE.Models;

namespace BE.Interfaces
{
    public interface IInscripcionRepository
    {

        Task<Inscripcion> GetInscripcion(int id);
      
        //Task UpdatePayment();
        Task<Inscripcion> CreateInscripcion(Inscripcion inscripcion);

        Task UpdateInscripcion(Inscripcion inscripcion);

        Task DeleteInscripcion(Inscripcion inscripcion);
        Task<Inscripcion> CheckIfExists(int usuarioID, int eventoID);
    }
}
