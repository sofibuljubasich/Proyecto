using BE.Dto;
using BE.Interfaces;
using BE.Models;
using DocumentFormat.OpenXml.InkML;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;

namespace BE.Repository
{
    public class EventoDistanciaRepository : IEventoDistanciaRepository
    {
        private readonly EventosContext _context;

        public EventoDistanciaRepository(EventosContext context) 
        { 
            _context = context;
        }

        public async Task Actualizar(List<EventoDistancia> eventoDistancias)
        {
           
            _context.EventoDistancia.AddRange(eventoDistancias);

            await _context.SaveChangesAsync();  
        }

        public async Task Create(EventoDistancia ed)
        {
            _context.EventoDistancia.Add(ed);
            await _context.SaveChangesAsync();  
        }

        public async Task<List<EventoDistancia>> GetDistanciasByEvento(int eventoID)
        {

            return await _context.EventoDistancia.Where(ed => ed.EventoID == eventoID).Include(ed=> ed.Distancia).ToListAsync();
            //return await _context.Distancias.Where(d => d.EventoDistancias.Any(e => e.EventoID == eventoID)).ToListAsync();

        }

        public async Task RemoveRange(List<EventoDistancia> distanciasAEliminar)
        {
            _context.EventoDistancia.RemoveRange(distanciasAEliminar);

            await _context.SaveChangesAsync();  
        }

        public async Task  Update(List<EventoDistancia> eventoDistancias)
        {
            _context.EventoDistancia.UpdateRange(eventoDistancias);
            await _context.SaveChangesAsync();


        }



        }
    }

