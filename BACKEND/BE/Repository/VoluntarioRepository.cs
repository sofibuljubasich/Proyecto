using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class VoluntarioRepository : IVoluntarioRepository
    {
        private readonly EventosContext _context;

        public VoluntarioRepository(EventosContext context)
        {
            _context = context;
        }

        public bool CheckIfExists(string email)
        {
            Voluntario? voluntario = _context.Voluntarios.FirstOrDefault(user => user.Email == email);
            return voluntario != null;
        }

        public async Task<Voluntario> Create(Voluntario voluntario)
        {
            _context.Voluntarios.Add(voluntario);

            await _context.SaveChangesAsync();
            return voluntario;
        }

        public async Task<List<Voluntario>> GetAll()
        {
            return await _context.Voluntarios.ToListAsync();    
        }

        public async Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            return await _context.TareaVoluntario.Where(tv=>tv.VoluntarioID == voluntarioID)
                                                 .Include(tv=> tv.Tarea)
                                                 .Select(tv=>tv.Tarea)
                                                 .ToListAsync();    
        }

        public async Task<List<Voluntario>> GetVoluntarios(ICollection<int> voluntariosIDs)
        {
            var voluntarios = await _context.Voluntarios
       .Where(v => voluntariosIDs.Contains(v.ID))
       .ToListAsync();

            return voluntarios;
        }

        public async Task Delete(Voluntario voluntario)
        {
            _context.Remove(voluntario);
            await _context.SaveChangesAsync();
        }

        public async Task<Voluntario> Get(int voluntarioID)
        {
            return await _context.Voluntarios.Include(v=>v.Rol).FirstOrDefaultAsync(v=>v.ID == voluntarioID);
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
            return await _context.TareaVoluntario.Where(tv=>tv.VoluntarioID ==voluntarioID && tv.Tarea.EventoID == eventoID)
                                                 .Include(tv=>tv.Tarea)
                                                 .Select(tv=>tv.Tarea).ToListAsync();   
        }
    }
}
