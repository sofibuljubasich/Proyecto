using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class TareaRepository : ITareaRepository
    {
        private readonly EventosContext _context;

        public TareaRepository(EventosContext context)
        {
            _context = context;
        }

        public async Task<Tarea> Create(Tarea tarea)
        {
            _context.Add(tarea);

            await _context.SaveChangesAsync();
            return tarea;
        }

        public async Task Delete(Tarea tarea)
        {
            _context.Remove(tarea);
            await _context.SaveChangesAsync();
        }

        public async Task<Tarea> GetTarea(int tareaID)
        {
            return await _context.Tareas.FindAsync(tareaID);
        }

        public async Task<List<Tarea>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        public async Task<List<Tarea>> GetTareasByEvento(int eventoID)
        {
            return await _context.Tareas.Where(t => t.EventoID == eventoID).ToListAsync();
        }

        public Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            throw new NotImplementedException();
        }

        //public async Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        //{
        //  return await _context.Tareas.Where(t => t.VoluntarioID == voluntarioID).ToListAsync();
        // }

        public async Task Update(Tarea tarea)
        {
            Tarea? t = await _context.Tareas.SingleOrDefaultAsync(t => t.ID == tarea.ID);

            if (t !=  null)
            {
                t.Descripcion = tarea.Descripcion;
                t.Ubicacion = tarea.Ubicacion;
                t.FechaHora = tarea.FechaHora;
               // t.UsuarioID = tarea.UsuarioID;
                t.EventoID = tarea.EventoID;

                await _context.SaveChangesAsync();

            }
        }
    }
}
