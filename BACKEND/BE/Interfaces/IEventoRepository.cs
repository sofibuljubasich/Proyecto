using BE.Models;
using BE.Dto;
using Microsoft.Extensions.Logging;

namespace BE.Interfaces
{
    public interface IEventoRepository
    {
      
            //activar/desactivar evento
    
            Task<List<Evento>> GetEventos();

            Task<Evento> GetEvento(int id);

            Task Delete(Evento evento);

            Task<Evento> Create(Evento evento);

        Task Update(int eventoID, EventoUpdateDto evento);

        Task<List<string>> GetLugares();

        Task<List<Evento>> GetFiltro(string? buqueda
          , DateTime? fechaInicio, DateTime? fechaFin, string? tipo, string? lugar);

        Task UpdateStatus(int eventoID, string estado);

            Task<List<Inscripcion>> GetInscripcionesByEvento(int idEvento);

            Task<List<Usuario>> GetVoluntariosByEvento(int eventoID);

        Task<List<Inscripcion>> GetResultados(int idEvento);

        bool CheckIfExists(int eventoID);

        Task<List<string>>
            GetInscriptosEmails(int eventoID);

       Task CargarResultado(int
           eventoID,int
           corredorID,string?
           posicionCat,string?
           posicionGral,string?
           tiempo);




    }
}
