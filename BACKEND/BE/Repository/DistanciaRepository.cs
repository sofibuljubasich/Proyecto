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

            _context.Add(distancia);

            await _context.SaveChangesAsync();
            return distancia;
        }

        public async Task Delete(Distancia distancia)
        {
            _context.Remove(distancia);
            await _context.SaveChangesAsync();  
        }

        public async Task<Distancia> GetDistancia(int id)
        {
            return await _context.Distancias.FindAsync(id);
        }

        public async Task<List<Distancia>> GetDistancias()
        {
            return await _context.Distancias.ToListAsync(); 
        }

        public async Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID)
        {

            return await _context.EventoDistancia.Where(ed => ed.EventoID == eventoID).ToListAsync();
            //return await _context.Distancias.Where(d => d.EventoDistancias.Any(e => e.EventoID == eventoID)).ToListAsync();
            
        }

        public async Task Update(Distancia distancia)
        {

            var distanciaItem = await _context.Distancias.FirstOrDefaultAsync(x => x.ID == distancia.ID);

            if (distanciaItem != null)
            {
                distanciaItem.KM = distancia.KM;

                await _context.SaveChangesAsync();
            }
        }
    }
}
