using BE.Dto;
using BE.Models;
using Microsoft.Extensions.Logging;

namespace BE.Interfaces
{
    public interface IEventoDistanciaRepository
    {
        Task Create(EventoDistancia eventoDistancia);

        Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID);

        Task Update(int eventoID,ICollection<EventoDistancia> EventoDistancias);
    }
}
