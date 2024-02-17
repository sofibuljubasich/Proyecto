using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class CategoriaRepository : ICategoriaRepository
    {

        private readonly EventosContext _context;

        public CategoriaRepository(EventosContext context)
        {
            _context = context;
        }

        public async Task<Categoria> Create(Categoria categoria)
        {
            _context.Add(categoria);

            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task DeleteCategoria(Categoria categoria)
        {
            _context.Remove(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task<Categoria> GetCategoria(int id)
        {
            return await _context.Categorias.FindAsync(id);
        }

        public async Task<List<Categoria>> GetCategorias()
        {
            return await _context.Categorias.ToListAsync();
        }

        public async Task<List<Categoria>> GetCategoriasByEvento(int eventoID)
        {


            return await _context.Categorias.Where(c => c.Eventos.Any(e => e.ID == eventoID)).ToListAsync();
        }

        public async Task UpdateCategoria(Categoria categoria)
        {
            var categoriaItem = await _context.Categorias.FirstOrDefaultAsync(x => x.ID == categoria.ID);

            if (categoriaItem != null)
            {
                categoriaItem.EdadInicio = categoria.EdadInicio;
                categoriaItem.EdadFin = categoria.EdadFin;

                await _context.SaveChangesAsync();
            }
        }
    }
}

