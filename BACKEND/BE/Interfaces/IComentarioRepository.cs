using BE.Models;

namespace BE.Interfaces
{
    public interface IComentarioRepository
    {

        Task<List<Comentario>> GetAllByEvento(int eventoID);    
        

        Task Delete(Comentario comentario);

        Task<Comentario> Create(Comentario comentario);


    }
}
