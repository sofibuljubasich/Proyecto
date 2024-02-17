using BE.Models;
using BE.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class EventoRepository : IEventoRepository
    {
        private readonly EventosContext _context;

        public EventoRepository(EventosContext context)
        {
            _context = context;
        }
        public async Task<Evento> Create(Evento evento)
        {
            _context.Eventos.Add(evento);   
            await _context.SaveChangesAsync();  
            return evento;      
            
        }

        public Task Delete(Evento evento)
        {
            throw new NotImplementedException();
        }

        public async Task<Evento> GetEvento(int id)
        {
            return await _context.Eventos.FindAsync(id);
        }

        public async Task<List<Evento>> GetEventos()
        {
            return await _context.Eventos.ToListAsync();
        }

        public Task Update(Evento evento)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEvento(Evento evento)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Inscripcion>> GetInscripcionesByEvento(int eventoID)
        {
            return await _context.Inscripciones.Where(i => i.EventoID == eventoID).ToListAsync();
        }

        public Task<List<Usuario>> GetVoluntariosByEvento(int eventoID)
        {
            throw new NotImplementedException();
        }

        public Task<List<Inscripcion>> GetResultados(int idEvento)
        {
            throw new NotImplementedException();
        }
    }
}
