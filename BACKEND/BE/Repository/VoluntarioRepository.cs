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

        public Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID)
        {
            throw new NotImplementedException();
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
            return await _context.Voluntarios.FirstOrDefaultAsync(v=>v.ID == voluntarioID);
        }
    }
}
