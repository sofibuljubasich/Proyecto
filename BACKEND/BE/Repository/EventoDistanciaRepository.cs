using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class EventoDistanciaRepository : IEventoDistanciaRepository
    {
        private readonly EventosContext _context;

        public EventoDistanciaRepository(EventosContext context) 
        { 
            _context = context;
        }
        public async Task Create(EventoDistancia ed)
        {
            _context.EventoDistancia.Add(ed);
            await _context.SaveChangesAsync();  
        }

        public async Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID)
        {

            return await _context.EventoDistancia.Where(ed => ed.EventoID == eventoID).Include(ed=> ed.Distancia).ToListAsync();
            //return await _context.Distancias.Where(d => d.EventoDistancias.Any(e => e.EventoID == eventoID)).ToListAsync();

        }

        public async Task  Update(int eventoID, ICollection<EventoDistancia> EventoDistancias)
        {
            _context.UpdateRange(EventoDistancias);
            await _context.SaveChangesAsync();  
            /*foreach (var ed in EventoDistancias) 
            { 
                EventoDistancia edDb =  _context.EventoDistancia.First(e=>e.ID == ed.ID);
                _context.UpdateRange(EventoDistancias);
                if (edDb is not null)
                {
                    edDb.Distancia.ID = ed.DistanciaID;
                    edDb.Precio = ed.Precio;
                    edDb.EventoID = eventoID;

                    await _context.SaveChangesAsync();
                }*/

        }



        }
    }

