using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

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

     

        public async Task<Corredor> GetCorredor(int id)
        {
            return await _context.Corredores.FindAsync(id);
        }

        public async Task<Corredor> CreateCorredor(Corredor corredor)
        {
            _context.Corredores.Add(corredor);

            await _context.SaveChangesAsync();
            return corredor;
        }

        public async Task UpdateCorredor(Corredor corredor)
        {
            var corredorItem = await _context.Corredores.FirstOrDefaultAsync(x=> x.ID  == corredor.ID); 

            if (corredorItem != null)
            {
                corredorItem.Nombre = corredor.Nombre;  
                corredorItem.Apellido = corredor.Apellido;
                corredorItem.Localidad = corredor.Localidad;    
                corredorItem.Telefono = corredor.Telefono;  
                corredorItem.ObraSocial = corredor.ObraSocial;
                corredorItem.FechaNacimiento = corredor.FechaNacimiento;
                corredorItem.Dni = corredor.Dni;    
                corredorItem.Genero = corredor.Genero;
                await _context.SaveChangesAsync();
            }
        }

        public Corredor? Validate(string userEmail, string password)
        {
            return _context.Corredores.SingleOrDefault(x => x.Email == userEmail && x.Password == password);
        }
    }
}
