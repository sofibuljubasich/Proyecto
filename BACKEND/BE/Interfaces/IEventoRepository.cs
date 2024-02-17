using BE.Models;
using Microsoft.Extensions.Logging;

namespace BE.Interfaces
{
    public interface IEventoRepository
    {
      

    
            Task<List<Evento>> GetEventos();

            Task<Evento> GetEvento(int id);

            Task Delete(Evento evento);

            Task<Evento> Create(Evento evento);

            Task Update(Evento evento);


            Task<List<Inscripcion>> GetInscripcionesByEvento(int idEvento);

            Task<List<Usuario>> GetVoluntariosByEvento(int eventoID);

        Task<List<Inscripcion>> GetResultados(int idEvento);



    }
}
