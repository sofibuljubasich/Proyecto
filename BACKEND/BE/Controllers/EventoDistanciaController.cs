using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoDistanciaController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEventoDistanciaRepository _eventoDistanciaRepository;
        private readonly IDistanciaRepository _distanciaRepository;

        public EventoDistanciaController(IMapper mapper,IEventoDistanciaRepository eventoDistanciaRepository, IDistanciaRepository distanciaRepository) 
        {

            _mapper = mapper;
            _eventoDistanciaRepository = eventoDistanciaRepository; 
            _distanciaRepository = distanciaRepository; 
        
        }

        [HttpPut("eventoID")]
        public async Task<IActionResult> Update(int eventoID, ICollection<EventoDistanciaUpdateDto> eventoDistanciaDto)
        {
        try
        {
                var distanciasExistentes = await _eventoDistanciaRepository.GetDistanciasByEvento(eventoID);

            //    var distanciasExistentes = await _context.EventoDistancia
       //  .Where(ed => ed.EventoID == eventoDistanciaDto.EventoID)
         //.ToListAsync();
                if (distanciasExistentes == null)
                {
                    return NotFound("No se encontraron registros de EventoDistancia para el evento especificado.");
                }

                List<EventoDistancia> eventoDistanciasParaActualizar = new List<EventoDistancia>();
               

                // Obtener los IDs de las distancias que se quieren mantener
                var nuevasDistanciasIds = eventoDistanciaDto.Select(d => d.DistanciaID).ToList();

                // Eliminar las distancias que ya no están en la nueva lista
                var distanciasAEliminar = distanciasExistentes
                    .Where(ed => !nuevasDistanciasIds.Contains(ed.Distancia.ID))
                    .ToList();

                
                await _eventoDistanciaRepository.RemoveRange(distanciasAEliminar);

                // Agregar o actualizar las distancias que están en la nueva lista
                foreach (var nuevaDistancia in eventoDistanciaDto)
                {
                    var distanciaExistente = distanciasExistentes
                        .FirstOrDefault(ed => ed.Distancia.ID == nuevaDistancia.DistanciaID);

                    if (distanciaExistente != null)
                    {
                        // Si la distancia ya existe, actualizamos el precio
                        distanciaExistente.Precio = nuevaDistancia.Precio;
                    }
                    else
                    {
                        
                        // Si la distancia no existe, la agregamos
                        var nuevaRelacion = new EventoDistancia
                        {
                            EventoID = eventoID,
                            Distancia = await _distanciaRepository.GetDistancia(nuevaDistancia.DistanciaID),
                            Precio = nuevaDistancia.Precio
                        };
                        
                        eventoDistanciasParaActualizar.Add(nuevaRelacion);
                    }
                }

                await _eventoDistanciaRepository.Actualizar(eventoDistanciasParaActualizar);


                return Ok("Distancias actualizadas con éxito.");

            }
                catch (Exception ex)
                {
                    return BadRequest($"Ocurrió un error al actualizar las EventoDistancias: {ex.Message}");
                }
            }


        }
    }

