using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class DistanciaRepository : IDistanciaRepository
    {
        private readonly EventosContext _context;
        public DistanciaRepository(EventosContext context) 
        {
            _context = context;
        }    
        public async Task<Distancia> Create(Distancia distancia)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(Distancia distancia)
        {
            throw new NotImplementedException();
        }

        public async Task<Distancia> GetDistancia(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Distancia>> GetDistancias()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Distancia>> GetDistanciasByEvento(int eventoID)
        {
          

                return await _context.Distancias.Where(d => d.Eventos.Any(e => e.ID == eventoID)).ToListAsync();
            
        }

        public async Task Update(Distancia distancia)
        {
            throw new NotImplementedException();
        }
    }
}
