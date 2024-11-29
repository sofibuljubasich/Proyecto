using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.WebSockets;

namespace BE.Repository
{
    public class CorredorRepository: ICorredorRepository
    {
        private readonly EventosContext _context;

        public CorredorRepository(EventosContext context) 
        {
            _context = context; 
        }

        public bool CheckIfUserExists(string email)
        {
            Corredor? user = _context.Corredores.FirstOrDefault(user => user.Email == email);
            return user != null;
        }


        public async Task<bool> ExisteCorredorConDNI(string dni)
        {
            return await _context.Corredores.AnyAsync(c=> c.Dni == dni);
        }


        public async Task<Corredor> GetCorredor(int id)
        {

            return await _context.Corredores.Include(c => c.Rol).FirstOrDefaultAsync(c=>c.ID == id); ;
        }


        public async Task<Corredor> GetCorredorByDni(string dni)
        {
            return await _context.Corredores.SingleOrDefaultAsync(c => c.Dni == dni);

        }
        public async Task<Corredor> CreateCorredor(Corredor corredor)
        {
            _context.Corredores.Add(corredor);

            await _context.SaveChangesAsync();
            return corredor;
        }


        public async Task UpdateCorredor(Corredor corredor)
        {
           
                await _context.SaveChangesAsync();
            
        }

        public Corredor? Validate(string userEmail, string password)
        {
            return _context.Corredores.SingleOrDefault(x => x.Email == userEmail && x.Password == password);
        }
    }
}
