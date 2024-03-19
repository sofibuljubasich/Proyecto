using BE.Models;
using BE.Dto;
using BE.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;
using AutoMapper;
using System.Threading;

namespace BE.Repository
{
    public class EventoRepository : IEventoRepository
    {
        

        private readonly EventosContext _context;

        public EventoRepository(EventosContext context )
        {
            _context = context;
        }
        public async Task<Evento> Create(Evento evento)
        {
            _context.Eventos.Add(evento);   
            await _context.SaveChangesAsync();  
            return evento;      
            
        }

        public async Task Delete(Evento evento)
        {
            var eventoToDelete = await _context.Eventos.SingleAsync(e => e.ID == evento.ID);

                
            if (eventoToDelete is not null)
            {
                _context.Eventos.Remove(eventoToDelete);
                //_context.Contacts.Remove(userToDelete);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<Evento> GetEvento(int id)
        
        {
            var evento =  await _context.Eventos.FirstOrDefaultAsync(e => e.ID == id);
            return evento;
          
        }

    

        public async Task<List<Evento>> GetEventos()
        {

            return await _context.Eventos.ToListAsync();

        }

        public async Task Update(int eventoID, EventoUpdateDto evento)
        {
            Evento? dbEvento = _context.Eventos.First(e=>e.ID ==  eventoID);

            if (dbEvento is not null)
            {
                dbEvento.Nombre = evento.Nombre;
                dbEvento.Lugar = evento.Lugar;
                dbEvento.Fecha = evento.Fecha;
                dbEvento.Estado = evento.Estado;
              //  dbEvento.EventoDistancias = evento.EventoDistancias;
                //  _context.Update(evento);
                await _context.SaveChangesAsync();
            }
        }

   

        public async Task<List<Inscripcion>> GetInscripcionesByEvento(int eventoID)
        {
            return await _context.Inscripciones.Where(i => i.EventoID == eventoID).ToListAsync();
        }

        public Task<List<Usuario>> GetVoluntariosByEvento(int eventoID)
        {
            throw new NotImplementedException();
        }

        public Task<List<Inscripcion>> GetResultados(int idEvento)
        {
            throw new NotImplementedException();
        }
    }
}



