using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class TipoEventoRepository : ITipoEventoRepository
    {

        private readonly EventosContext _context;

        public TipoEventoRepository(EventosContext context)
        {
            _context = context;
        }

        public async Task<TipoEvento> Create(TipoEvento tipo)
        {
            _context.TiposEventos.Add(tipo);

            await _context.SaveChangesAsync();
            return tipo;
        }

        public async Task DeleteTipoEvento(TipoEvento tipo)
        {
            _context.Remove(tipo);
            await _context.SaveChangesAsync();
        }

        public async Task<TipoEvento> GetTipoEvento(int id)
        {
            return await _context.TiposEventos.FindAsync(id);
        }

        public async Task<List<TipoEvento>> GetTipos()
        {
            return await _context.TiposEventos.ToListAsync();
        }

       
        public async Task UpdateTipoEvento(TipoEvento tipo)
        {
            var tipoItem = await _context.TiposEventos.FirstOrDefaultAsync(x => x.ID == tipo.ID);

            if (tipoItem != null)
            {
                tipoItem.Descripcion = tipo.Descripcion;

                await _context.SaveChangesAsync();
            }
        }
    }
}

