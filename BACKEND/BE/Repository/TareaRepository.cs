using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;

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
            return  await _context.Tareas
           .Include(t => t.Voluntarios)
           .FirstOrDefaultAsync(t => t.ID == tareaID);
        }

        public async Task<List<Tarea>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        public async Task<List<Tarea>> GetTareasByEvento(int eventoID)
        {
            return await _context.Tareas.Where(t => t.EventoID == eventoID).Include(t=>t.Voluntarios).ToListAsync();
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
             _context.Update(tarea);
            await _context.SaveChangesAsync();
            

        }

        public async Task<List<Voluntario>> GetVoluntariosByTarea(int tareaID) 
        {
            var tarea = await _context.Tareas
           .Include(t => t.Voluntarios)
           .FirstOrDefaultAsync(t => t.ID == tareaID);

            if (tarea == null)
            {
                return null; // O manejar de acuerdo a tus necesidades
            }

            // Devolver la colección de voluntarios asignados a la tarea
            return tarea.Voluntarios.ToList();
        }
    }
}
