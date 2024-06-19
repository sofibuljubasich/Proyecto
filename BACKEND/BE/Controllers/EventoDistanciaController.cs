using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
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

        public EventoDistanciaController(IMapper mapper,IEventoDistanciaRepository eventoDistanciaRepository) 
        {

            _mapper = mapper;
            _eventoDistanciaRepository = eventoDistanciaRepository; 
        
        }

        [HttpPut("eventoID")]
        public async Task<IActionResult> Update(int eventoID, ICollection<EventoDistanciaUpdateDto> edList)
        {
            try 
            {
                var eventosDistancias = _mapper.Map<ICollection<EventoDistancia>>(edList);
                await _eventoDistanciaRepository.Update(eventoID, eventosDistancias);
                return Ok("ACTUALIZADO");

            
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
    }
}
