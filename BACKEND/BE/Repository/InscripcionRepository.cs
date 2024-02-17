using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BE.Repository
{
    public class InscripcionRepository: IInscripcionRepository
    {
        private readonly EventosContext _context;

        public InscripcionRepository(EventosContext context) 
        {
            _context = context;        
        }

        public async Task<Inscripcion> CheckIfExists(int usuarioID, int eventoID)
        {
            var inscripcion = await _context.Inscripciones.Where(i => i.EventoID == eventoID && i.UsuarioID == usuarioID).FirstOrDefaultAsync();
            return inscripcion;
        }

        public async Task<Inscripcion> CreateInscripcion(Inscripcion inscripcion)
        {
            _context.Add(inscripcion);

            await _context.SaveChangesAsync();
            return inscripcion;
        }

        public Task DeleteInscripcion(Inscripcion inscripcion)
        {
            throw new NotImplementedException();
        }

        public async Task<Inscripcion> GetInscripcion(int id)
        {
            return await _context.Inscripciones.FindAsync(id);
        }

      

       
       

        public Task UpdateInscripcion(Inscripcion inscripcion)
        {
            throw new NotImplementedException();
        }
    }
}
