using BE.Models;

namespace BE.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<List<Categoria>> GetCategorias();

        Task<List<Categoria>> GetCategoriasByEvento(int eventoID);

        Task<Categoria> GetCategoria(int id);
        Task<Categoria> Create(Categoria categoria);

        Task UpdateCategoria(Categoria categoria);

        Task DeleteCategoria(Categoria categoria);
    }
}
