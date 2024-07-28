using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class TareaVoluntarioService : ITareaVoluntarioService
    {
        private readonly EventosContext _context;

        public TareaVoluntarioService(EventosContext context)
        {
            _context = context;
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
            var voluntarios = await _context.TareaVoluntario.Where(tv => tv.TareaID == tareaID).
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
                    Estado = "Pendiente"
                };

                _context.Add(tareaVoluntario);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            return await _context.TareaVoluntario.Where(tv => tv.VoluntarioID == voluntarioID)
                                                 .Include(tv => tv.Tarea)
                                                 .Select(tv => tv.Tarea)
                                                 .ToListAsync();
        }

        public async Task<List<Tarea>> GetTareasByEventoVoluntario(int eventoID, int voluntarioID)
        {
            /* var tareas = await _context.Voluntarios
                             .Where(v => v.ID == voluntarioID)
                             .SelectMany(v => v.Tareas)
                             .Include(t => t.Evento).Where(e=>e.EventoID == eventoID) 
                             .ToListAsync();
             return tareas
             return await _context.TareaVoluntario.Where(tv=>tv.VoluntarioID == voluntarioID)
                                                 .Include(tv=> tv.Tarea)
                                                 .Select(tv=>tv.Tarea)
                                                 .ToListAsync();    
            
            ;*/
            return await _context.TareaVoluntario.Where(tv => tv.VoluntarioID == voluntarioID && tv.Tarea.EventoID == eventoID)
                                                 .Include(tv => tv.Tarea)
                                                 .Select(tv => tv.Tarea).ToListAsync();
        }





    }
}

