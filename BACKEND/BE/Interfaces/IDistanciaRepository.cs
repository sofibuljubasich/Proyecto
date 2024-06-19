using BE.Models;

namespace BE.Interfaces
{
    public interface IDistanciaRepository
    {

        Task<List<Distancia>> GetDistancias();

        Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID); 
        Task<Distancia> GetDistancia(int id);
        Task Delete(Distancia distancia);
        Task<Distancia> Create(Distancia distancia);
        Task Update(Distancia distancia);
    
}
}
