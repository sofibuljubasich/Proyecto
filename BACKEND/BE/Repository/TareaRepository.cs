using BE.Interfaces;
using BE.Migrations;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
            /*  return await _context.Tareas
             .Include(t => t.Voluntarios)
             .FirstOrDefaultAsync(t => t.ID == tareaID);*/
            return await _context.Tareas.FirstOrDefaultAsync(t => t.ID == tareaID);
        }

        public async Task<List<Tarea>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        public async Task<List<Tarea>> GetTareasByEvento(int eventoID)
        {
            return await _context.Tareas
                            .Include(t => t.TareaVoluntarios)
            .ThenInclude(tv => tv.Voluntario)
                            .Where(t => t.EventoID == eventoID)
                            .ToListAsync();
            // return await _context.Tareas.Where(t => t.EventoID == eventoID).Include(t => t.Voluntarios).ToListAsync();
        }

        public async Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            return await _context.TareaVoluntario
                            .Where(tv => tv.VoluntarioID == voluntarioID)
                            .Select(tv => tv.Tarea)
                            .ToListAsync();

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
        {/*
          *
               var tarea = await _context.Tareas
              .Include(t => t.Voluntarios)
              .FirstOrDefaultAsync(t => t.ID == tareaID);

               if (tarea == null)
               {
                   return null; // O manejar de acuerdo a tus necesidades
               }

               // Devolver la colección de voluntarios asignados a la tarea
               return tarea.Voluntarios.ToList();*/
            var voluntarios = await  _context.TareaVoluntario.Where(tv => tv.TareaID == tareaID).
                                        Select(tv => tv.Voluntario).ToListAsync();
           

            return voluntarios;
        }

        public async Task CreateTareaVoluntario(int tareaID, List<Voluntario> voluntarios)
        {
            foreach (var voluntario in voluntarios)
            {
                var tareaVoluntario = new TareaVoluntario
            {
                TareaID = tareaID,
                VoluntarioID = voluntario.ID,
                Voluntario = voluntario,
                Estado = "Asignado"
            };

             _context.Add(tareaVoluntario);
        }
            await _context.SaveChangesAsync();
        }
    }
}

