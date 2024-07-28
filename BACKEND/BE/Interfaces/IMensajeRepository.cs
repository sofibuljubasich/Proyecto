using BE.Models;
using BE.Dto;
namespace BE.Interfaces
{
    public interface IMensajeRepository
    {

        Task<List<Mensaje>> GetMensajes(int usuarioID, int otroUserID);

        Task<Mensaje> Create(Mensaje mensaje);

        Task<List<ChatDto>> GetChats(int usuarioID);

        Task MarcarLeido(List<Mensaje> mensajes);    

    }
}
