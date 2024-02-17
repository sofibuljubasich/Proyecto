using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class ComentarioRepository : IComentarioRepository
    {
        private readonly EventosContext _context;    

        public ComentarioRepository(EventosContext eventosContext) 
        {
            _context = eventosContext;       
        }
        public async Task<Comentario> Create(Comentario comentario)
        {
            _context.Add(comentario);

            await _context.SaveChangesAsync();
            return comentario;
        }

        public async Task Delete(Comentario comentario)
        {
            _context.Remove(comentario);    

             await _context.SaveChangesAsync();       
        }

        public async Task<List<Comentario>> GetAllByEvento(int eventoID)
        {
            return await _context.Comentarios.Where(c => c.EventoID == eventoID).ToListAsync();     
        }
    }
}
