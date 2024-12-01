using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class TareaVoluntarioRepository : ITareaVoluntarioRepository
    {
        private readonly EventosContext _context;

        public TareaVoluntarioRepository(EventosContext context)
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
                    Estado = "Asignado"
                };

                _context.Add(tareaVoluntario);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            return await _context.TareaVoluntario.Where(tv => tv.VoluntarioID == voluntarioID)
                                                 .Include(tv => tv.Tarea)
                                                 .ThenInclude(t=> t.Evento)
                                                 .Select(tv => tv.Tarea)
                                                 .ToListAsync();
        }

        public async Task<List<TareaVoluntarioEventoDto>> GetTareasByEventoVoluntario(int eventoID, int voluntarioID)
        {
            var tareasConComentarios = await _context.TareaVoluntario
          .Where(tv => tv.VoluntarioID == voluntarioID && tv.Tarea.EventoID == eventoID)
          .Include(tv => tv.Voluntario)
          .Select(tv => new TareaVoluntarioEventoDto
          {
              tarea = new TareaGetDto
              {
                  ID = tv.Tarea.ID,
                  Descripcion = tv.Tarea.Descripcion,
                  FechaHora = tv.Tarea.FechaHora,
                  Ubicacion = tv.Tarea.Ubicacion,
                  OtrosVoluntarios = 
                    tv.Tarea.TareaVoluntarios.Select(tv2 => new OtroVoluntarioDto
                  {
                      Nombre = tv2.Voluntario.Nombre,
                      Apellido = tv2.Voluntario.Apellido,
                      ID = tv2.VoluntarioID
                  }).ToList()
              },
              Comentario = tv.Comentario,
              Estado = tv.Estado,
              VoluntarioNombre = tv.Voluntario.Nombre,
              VoluntarioApellido = tv.Voluntario.Apellido
              
          })
          .ToListAsync();

            return tareasConComentarios;
        }

        public async Task DeleteTareasByVoluntario(TareaVoluntario tareaVoluntario)
        {
            
            _context.TareaVoluntario.Remove(tareaVoluntario);
            
            await _context.SaveChangesAsync();
        }

        public async Task AddComentario(TareaVoluntario tareaVoluntario)
        {
            _context.TareaVoluntario.Update(tareaVoluntario);
            await _context.SaveChangesAsync();  
        }

        public async Task AddEstado(TareaVoluntario tareaVoluntario)
        {
            _context.TareaVoluntario.Update(tareaVoluntario);
            await _context.SaveChangesAsync();
        }

        public async Task<TareaVoluntario> Get(int tareaID, int voluntarioID)
        {
            return await _context.TareaVoluntario.FindAsync(tareaID, voluntarioID);
        }

        public async Task RemoveVoluntarios(List<Voluntario> voluntarios)
        {
             _context.RemoveRange(voluntarios);
                await _context.SaveChangesAsync();
        }

        public async Task AddVoluntario(int tareaID, int voluntarioID)
        {
            _context.Add(new TareaVoluntario
            {
                TareaID = tareaID,
                VoluntarioID = voluntarioID,
                Estado= "Pendiente"
            });
            await _context.SaveChangesAsync();
        }

        public async Task<List<Evento>> GetEventosByVoluntario(int voluntarioID)
        {
            var eventos = await _context.TareaVoluntario
                .Where(tv => tv.VoluntarioID == voluntarioID && tv.Tarea.Evento.Estado == "Activo") // Filtrar por estado activo
                .Select(tv => tv.Tarea.Evento)
                .Distinct()
                .ToListAsync();

            return eventos;
        }
    }
}

