using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IEventoRepository _eventoRepository;

        public EventoController(IMapper mapper, IEventoRepository eventoRepository)
        {
            _mapper = mapper;
            _eventoRepository = eventoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listEventos = await _eventoRepository.GetEventos();

                var listEventosDto = _mapper.Map<IEnumerable<EventoDto>>(listEventos);

                return Ok(listEventosDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{eventoID}")]
        public async Task<IActionResult> Get(int eventoID)
        {
            try
            {
                var evento = await _eventoRepository.GetEvento(eventoID);

                if (evento == null)
                {
                    return NotFound();
                }

                var eventoDto = _mapper.Map<EventoDto>(evento);

                return Ok(eventoDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //Por rol
        //[Route("inscriptos")]
        [HttpGet,Route("inscriptos/{eventoID}")]
        public async Task<IActionResult> GetInscripciones(int eventoID)
        {
            try
            {
                var listEventos = await _eventoRepository.GetInscripcionesByEvento(eventoID);

                var listEventosDto = _mapper.Map<IEnumerable<EventoDto>>(listEventos);

                return Ok(listEventosDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet,Route("voluntarios/{eventoID}")]
        public async Task<IActionResult> GetVoluntarios(int eventoID)
        {
            try
            {
                var listVoluntarios = await _eventoRepository.GetVoluntariosByEvento(eventoID);

                var listVoluntariosDto = _mapper.Map<IEnumerable<VoluntarioDto>>(listVoluntarios);

                return Ok(listVoluntariosDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //Por Rol
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var evento = await _eventoRepository.GetEvento(id);

                if (evento == null)
                {
                    return NotFound();
                }

                await _eventoRepository.Delete(evento);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Por Rol
        [HttpPost]
        public async Task<IActionResult> Create(EventoCreateUpdateDto eventoDto)
        {
            try
            {
                var evento = _mapper.Map<Evento>(eventoDto);



                evento = await _eventoRepository.Create(evento);


                return CreatedAtAction("Get", new { id = evento.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Por Rol
        //ACOMODAR
        [HttpPut("{id}")]

        public async Task<IActionResult> Update(int id, EventoCreateUpdateDto eventoDto)
        {
            try
            {
                var evento = _mapper.Map<Evento>(eventoDto);

                if (id != evento.ID)
                {
                    return BadRequest();
                }

                var eventoItem = await _eventoRepository.GetEvento(id);

                if (eventoItem == null)
                {
                    return NotFound();
                }

                await _eventoRepository.Update(evento);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Route("resultados")]
        [HttpGet, Route("resultados/{eventoID}")]
        public async Task<IActionResult> GetResultados(int eventoID)
        {
            try 
            {
                var evento = await _eventoRepository.GetEvento(eventoID);

                if (evento.Estado == "Activo") 
                {
                    return BadRequest("Evento No Finalizado ");                
                }
                var listResultados = await _eventoRepository.GetResultados(eventoID);

                var listResultadosDto = _mapper.Map<IEnumerable<ResultadoDto>>(listResultados);

                return Ok(listResultadosDto);
            
            
            
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }   
        }

    }

    }


