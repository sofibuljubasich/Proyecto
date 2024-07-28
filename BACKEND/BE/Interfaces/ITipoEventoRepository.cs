using BE.Models;

namespace BE.Interfaces
{
    public interface ITipoEventoRepository
    {
        Task<List<TipoEvento>> GetTipos();


        Task<TipoEvento> GetTipoEvento(int id);
        Task<TipoEvento> Create(TipoEvento tipo);

        Task UpdateTipoEvento(TipoEvento tipo);

        Task DeleteTipoEvento(TipoEvento tipo);

    }
}
