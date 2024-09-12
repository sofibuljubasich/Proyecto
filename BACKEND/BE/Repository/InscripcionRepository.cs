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

        public async Task Acreditar(int inscID, Boolean estado)
        {
            Inscripcion? inscrip = await _context.Inscripciones.FindAsync(inscID);

            if (inscrip is not null)
            {
                inscrip.Acreditado = estado;
                await _context.SaveChangesAsync();
            }
            
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

      

       
       

        public async Task UpdateInscripcion(Inscripcion inscripcion, int ID)
        {
            Inscripcion? dbInscrip = _context.Inscripciones.First(i=>i.ID == ID);   
            

            if (dbInscrip is not null)
            {
                dbInscrip.Remera = inscripcion.Remera;
                //  dbEvento.EventoDistancias = evento.EventoDistancias;
                //  _context.Update(evento);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Evento>> ObtenerEventosInscritosPorUsuario(int usuarioID)
        {
            var eventos = await _context.Inscripciones
                .Where(i => i.UsuarioID == usuarioID)
                .Include(i => i.Evento) // Incluye los eventos relacionados
                .Select(i => i.Evento)  // Selecciona solo los eventos
                .ToListAsync();

            return eventos;
        }

        public async Task UpdatePayment(int inscID, string estadoPago)
        {

            Inscripcion? dbInscrip = await _context.Inscripciones.FindAsync(inscID);

           if(dbInscrip is not null)
            { 
                
                dbInscrip.EstadoPago = estadoPago;

                await _context.SaveChangesAsync();
            }
        }
    }
}
