using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class MensajeRepository: IMensajeRepository
    {
        private readonly EventosContext _context;

        public MensajeRepository(EventosContext context)
        {
            _context = context;
        }

        public async Task<Mensaje> Create(Mensaje mensaje)
        {
             _context.Mensaje.Add(mensaje);  
            await _context.SaveChangesAsync();      
            return mensaje;

        }

        public async Task<List<ChatDto>> GetChats(int usuarioID)
        {
            return await _context.Mensaje
            .Where(m => m.destinatarioID == usuarioID && !m.EstadoLeido)
            .GroupBy(m => m.remitenteID)
            .Select(g => new ChatDto
            {
                RemitenteID = usuarioID,
                DestinatarioID = g.Key,
                CantidadSinLeer = g.Count()
            }).ToListAsync();
            

        }

        public async Task<List<Mensaje>> GetMensajes(int usuarioID, int otroUsuarioID)
        {
            return await _context.Mensaje
            .Where(m => (m.remitenteID == usuarioID && m.destinatarioID == otroUsuarioID) ||
                        (m.remitenteID == otroUsuarioID && m.destinatarioID == usuarioID))
            .OrderBy(m => m.FechaHoraEnvio)
            .ToListAsync();
        }

        public async Task MarcarLeido(List<Mensaje> mensajes)
        {
            foreach(var m in mensajes) 
            { 
                m.EstadoLeido = true;   

                _context.Mensaje.Update(m);
            
            }

            await _context.SaveChangesAsync();  
        }
    }
}
