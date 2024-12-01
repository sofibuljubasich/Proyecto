using BE.Dto;
using BE.Models;
using Microsoft.Extensions.Logging;

namespace BE.Interfaces
{
    public interface IEventoDistanciaRepository
    {
        Task Create(EventoDistancia eventoDistancia);

        Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID);

        Task Update(List<EventoDistancia> DistanciaPrecio);

        Task RemoveRange(List<EventoDistancia> distanciasAEliminar);

        Task Actualizar(List<EventoDistancia> eventoDistancias);    
    }
}
