using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace BE.Repository
{
    public class RolRepository : IRolRepository
    {
        private readonly EventosContext _context;

        public RolRepository(EventosContext context) { 
        
            _context = context; 
        }

        public async Task<Rol> Create(Rol rol)
        {
            _context.Add(rol);

            await _context.SaveChangesAsync();
            return rol;
        }

        public async Task Delete(Rol rol)
        {
            _context.Remove(rol);

            await _context.SaveChangesAsync();      
        }

        public async Task<Rol> GetRol(int ID)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.ID == ID);

        }

        public async Task<List<Rol>> GetRoles()
        {
            return await _context.Roles.ToListAsync();

        }

        public async Task Update(Rol rol)
        {
            _context.Update(rol);
            await _context.SaveChangesAsync();

        }
    }
}
