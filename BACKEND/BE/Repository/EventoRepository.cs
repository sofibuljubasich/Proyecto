using BE.Models;
using BE.Dto;
using BE.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;
using AutoMapper;
using System.Threading;
using Microsoft.Extensions.Logging;

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
        public async Task ActualizarEstadoEventosAsync()
        {
            var fechaActual = DateTime.Today;

            // Seleccionar eventos cuya fecha es igual a la fecha actual
            var eventos = await _context.Eventos
                .Where(e => e.Fecha.Date == fechaActual && e.Estado != "Inactivo")
                .ToListAsync();

            // Actualizar el estado de los eventos
            foreach (var evento in eventos)
            {
                evento.Estado = "Inactivo";
            }

            // Guardar cambios
            if (eventos.Any())
            {
                await _context.SaveChangesAsync();
            }
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
            var evento =  await _context.Eventos.Include(e => e.Categorias).FirstOrDefaultAsync(e => e.ID == id);
            return evento;
          
        }

    

        public async Task<List<Evento>> GetEventos()
        {

            return await _context.Eventos.ToListAsync();

        }

        public async Task Update(Evento evento)
        {
            
                _context.Eventos.Update(evento);
                await _context.SaveChangesAsync();
            
        }

   

        public async Task<List<Inscripcion>> GetInscripcionesByEvento(int eventoID)
        {
            var ins = await _context.Inscripciones.Where(i=> i.EventoID == eventoID).ToListAsync();  
            return ins;
        }
        //No es necesario
        public Task<List<Usuario>> GetVoluntariosByEvento(int eventoID)
        {
            throw new NotImplementedException();
        }

        /*public async Task<List<Inscripcion>> GetResultados(int idEvento)
        {
            var ins = await _context.Inscripciones.Where(i => i.EventoID == idEvento).ToListAsync();
            return ins;
        }*/

        public async Task<List<Inscripcion>> GetResultados(int idEvento)
{
    var ins = await _context.Inscripciones
        .Include(i => i.Corredor)        // Incluye la entidad Corredor
        .Include(i => i.Distancia)       // Incluye la entidad Distancia
        .Where(i => i.EventoID == idEvento)
        .ToListAsync();

    return ins;
}


        public async Task UpdateStatus(int eventoID, string estado)
        {
            Evento? dbEvento = _context.Eventos.First(e => e.ID == eventoID);

            if (dbEvento is not null)
            {
               
                dbEvento.Estado = estado;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<string>> GetLugares() 
        {
            return await _context.Eventos.Select(e =>e.Lugar).Distinct().ToListAsync();
        }

        public async Task<List<Evento>> GetFiltro(string? busqueda
          , DateTime? fechaInicio, DateTime? fechaFin, string? tipo, string? lugar)
        {
            var query = _context.Eventos.AsQueryable();

            if (!string.IsNullOrEmpty(busqueda))
            {
                query = query.Where(e => e.Nombre.Contains(busqueda));
            }

            if (fechaInicio.HasValue)
            {
                query = query.Where(e => e.Fecha >= fechaInicio.Value);
            }

            if (fechaFin.HasValue)
            {
                query = query.Where(e => e.Fecha <= fechaFin.Value);
            }

            if (!string.IsNullOrEmpty(tipo))
            {
                query = query.Where(e => e.Tipo.Descripcion== tipo);
            }

            if (!string.IsNullOrEmpty(lugar))
            {
                query = query.Where(e => e.Lugar == lugar);
            }

            return await query.ToListAsync();

        }

        public bool CheckIfExists(int eventoID)
        {
            Evento? evento = _context.Eventos.FirstOrDefault(e => e.ID == eventoID);
            return evento!= null;   
           
        }

        public async Task<List<string>> GetInscriptosEmails(int eventoID)
        {
            var emails = await _context.Inscripciones
        .Where(i => i.EventoID == eventoID)
        .Select(i => i.Corredor.Email)
        .ToListAsync();

            return emails;
        }

        public async Task CargarResultado(int eventoID, int corredorID, string? posicionCat, string? posicionGral, string? tiempo)
        {
            var inscrip = await _context.Inscripciones.SingleOrDefaultAsync(i => i.EventoID == eventoID && i.Corredor.ID == corredorID);

            if (inscrip != null)
            {
                inscrip.PosicionCategoria = posicionCat;
                inscrip.PosicionGeneral = posicionGral;
                inscrip.Tiempo = tiempo;
            }
            await _context.SaveChangesAsync();


        }

        public async Task CargarImagen(string ImagenURL, int eventoID)
        {
            var evento = await _context.Eventos.SingleOrDefaultAsync(e=>e.ID == eventoID);

            if (evento != null)
            {
                evento.Imagen = ImagenURL;  

                await _context.SaveChangesAsync();  
            }
        }
    }
}



